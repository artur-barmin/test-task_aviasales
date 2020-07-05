import filterTickets from './filterTickets'
import { sortByDuration, sortByPrice } from './sortTickets'

export default async function getTickets(sort, filters) {
  const searchID = await getSearchID('https://front-test.beta.aviasales.ru/search');

  console.group('получаем билеты, searchID:', searchID);

  let tickets = await loadAllTickets('https://front-test.beta.aviasales.ru/tickets?searchId=' + searchID);
  tickets = filterTickets(tickets, filters);
  tickets = (sort === "cheapest" ? sortByPrice : sortByDuration)(tickets);

  console.groupEnd();

  // Для тестового задания достаточно вывода 5 билетов
  return tickets.slice(0, 5);
}

async function getSearchID(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json.searchId;
}

async function loadAllTickets(url) {
  const store = [];
  let isStopped = false;
  // предохранитель от бесконечного цикла на случай неправильной работы сервера
  let safeCounter = 0;
  while (!isStopped) {
    const pack = await loadPack(url);
    isStopped = pack.stop;
    store.push(...pack.tickets);
    if (isStopped) {
      console.log('поиск завершен! stop:', pack.stop, ', count of tickets:', store.length);
    }
    if (safeCounter >= 100) {
      console.warn('Непредвиденное превышение кол-ва запросов, завершение поиска');
      isStopped = true;
    }
    safeCounter += 1;
  }
  return store;
}

async function loadPack(searchSessionURL) {
  const req = await fetch(searchSessionURL);
  // Сервер периодически симулирует ошибки с конкретно 500-м кодом
  if (req.status === 500) {
    return await loadPack(searchSessionURL);
  }
  return await req.json();
}