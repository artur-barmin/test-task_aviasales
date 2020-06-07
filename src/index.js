import React from 'react'
import ReactDOM from 'react-dom'

import './style.css'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import TicketList from './components/TicketList'

function App() {

  return (
    <div className='container'>
      <div className="row">
        <Header />
      </div>
      <div className="row">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}
let url = new URL('https://front-test.beta.aviasales.ru');
let entryPath = new URL('/search', url);
let searchPath = new URL('/tickets?searchId=', url);

function getSearchID(url) {
  return fetch(url)
    .then(res => res.json())
    .then(json => json.searchId);
}


// async function getTicketList(url, store) {
//   try {
//   let req = await fetch(url);

//   if (req.status === 500) {
//     getTicketList(url, store);
//   } else if (req.status === 404) {
//     console.warn('ошибка - передача была закончена');
//     return;
//   } else {
//     req = await req.json();
//     store = store.concat(req.tickets);
//     if (req.stop) {
//       console.log('Передача закончена');
//       return;
//     }
//     getTicketList(url, store);
//   }
//   console.log(store.length);
//   } catch(err) {
//     console.log('ошибка какая-то:', err);
//   }
// }
// async function start() {
//   let id = await getSearchID(entryPath);
//   console.log(id, '--- start receiving with path:');
//   const path = searchPath + id;
//   console.log(path);

//   let tickets = [];
//   getTicketList(path, tickets);
// }
// start()
// -----------------------
// async function getTicketList(url) {
//   let store = [];
//   let req = await fetch(url);

//   if (req.status === 500) {
//     store = store.concat(getTicketList(url));

//   } else if (req.status === 404) {
//     console.warn('404 - передача была закончена');
//     return store;

//   } else {
//     req = await req.json();
//     store = store.concat(req.tickets);
//     if (req.stop) {
//       console.log('Передача закончена');
//       return store;
//     }
//     store = store.concat(getTicketList(url));
//   }

//   console.log(store.length);
//   return store;
// }

// async function start() {
//   let id = await getSearchID(entryPath);
//   console.log(id, '--- start receiving');
//   const path = searchPath + id;
//   console.log(path);

//   let tickets = [];
//   tickets = tickets.concat(await getTicketList(path));
//   console.log('dlina', tickets.length);
// }
// start()



async function getTicketList(url) {
  let store = [];
  for (let stop = false, i = 0; stop !== true && i < 100; i += 1) {
    let pack = await getPack(url);
    stop = pack.stop;
    if (stop) {
      console.log('Получение билетов: успешно');
    }
    store.push(...pack.tickets);
  }
  return store;
}
function getPack(url) {
  return fetch(url)
    .then(res => res.json())
    .catch(err => {
      console.log('Ошибка получения пакета', err);
      return getPack(url);
    })
}

async function start() {
  let id = await getSearchID(entryPath);
  console.log('id', id, '--- start receiving');
  const path = searchPath + id;
  console.log(path);

  // получаем ВСЕ билеты
  let ticketsAll = await getTicketList(path);
  console.log(ticketsAll);

  // Проверял разные хэши. Вывод: индекс как хэш, и не морочить голову
  // let se = new Set(a.map((item, index) => index + '_' + String(item.price).slice(0,1)));
  // if (a.length !== se.size) {
  //   console.warn('ВОЗМОЖНА ОШИБКА ХЭШИРОВАНИЯ! Расхождение:', a.length - se.size);
  // }
  // se = null;

  // СОРТИРОВКА
  // Получение первых пяти самых дешевых
  let ticketsByPrice = ticketsAll
    .slice()
    .sort((a, b) => a.price - b.price)
    .slice(0, 5);
  console.log(ticketsByPrice);

  // Получение первых пяти самых быстрых
  let ticketsByDuration = ticketsAll
    .slice()
    .sort((a, b) => {
      return a.segments.reduce((prev, item) => prev.duration + item.duration)
        -
        b.segments.reduce((prev, item) => prev.duration + item.duration);
    })
    .slice(0, 5);
  console.log(ticketsByDuration);

  // ФИЛЬТРАЦИЯ по пересадкам
  
}
start()

ReactDOM.render(<App />, document.getElementById('root'))