import filterTickets from './filterTickets'
import { sortByDuration, sortByPrice } from './sortTickets'

export default async function getTickets(sort, filters) {
  const origin = new URL('https://front-test.beta.aviasales.ru');
  const entryAPI = new URL('/search', origin);
  const searchAPI = new URL('/tickets?searchId=', origin);

  const searchID = await getSearchID(entryAPI);
  console.group('получаем билеты, searchID:', searchID);

  let tickets = await loadAllTickets(searchAPI + searchID);
  tickets = filterTickets(tickets, filters);
  tickets = (sort === "cheapest" ? sortByPrice : sortByDuration)(tickets);

  console.groupEnd();
  return tickets.slice(0, 5);
}

async function getSearchID(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json.searchId;
}

async function loadAllTickets(url) {
  const store = [];
  // ATTENTION: safeCounter появился из-за непредсказуемо случавшегося бесконечного цикла.
  for (let stop = false, safeCounter = 0; stop !== true && safeCounter < 100; safeCounter += 1) {
    if (safeCounter >= 90) { console.warn('превышение кол-ва запросов, осталось', 100 - safeCounter) }
    const pack = await loadPack(url);
    stop = pack.stop;
    store.push(...pack.tickets);
    if (stop) {
      console.log('поиск завершен! stop:', pack.stop, ', count of tickets:', store.length);
    }
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

