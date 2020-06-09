import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './style.css'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

class App extends Component {
  render() {
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
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))


async function start() {
  let url = new URL('https://front-test.beta.aviasales.ru');
  let entryPath = new URL('/search', url);
  let searchPath = new URL('/tickets?searchId=', url);

  let id = await getSearchID(entryPath);
  const path = searchPath + id;
  console.log('id', id, '--- start receiving');
  console.log(path);
  // получаем ВСЕ билеты
  let ticketsAll = await getTicketList(path);
  console.log(ticketsAll.length);
  let cheapers = getCheapestTickets(ticketsAll);
  console.log('cheapest:', cheapers);
}
start();
// Получаем айди сеанса поиска
function getSearchID(url) {
  return fetch(url)
    .then(res => res.json())
    .then(json => json.searchId);
}
// Получаем ВСЕ билеты в одном сеансе поиска
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
// Получаем пачку билетов
function getPack(url) {
  return fetch(url)
    .then(res => res.json())
    .catch(err => {
      console.log('Ошибка получения пакета', err);
      return getPack(url);
    })
}
// ФИЛЬТРАЦИЯ по пересадкам
// Как считается кол-во пересадок: т.к. билеты "туда + обратно", то берется максимальное
// количество пересадок на любом из этих двух полётов
// NOTE: хотел использовать Set для оптимизированного формирования мн-в. Вроде 23мс, не особо надо
// let ids = new Set(ticketsAll.map((item, index) => index < 10 ? index : null));
function getFilteredBy(targetArr, filterNum) {
  return targetArr.filter((ticket, index) => {
    return Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length) === filterNum;
  })
}
// СОРТИРОВКА
// Получение первых пяти самых дешевых
function getCheapestTickets(tickets) {
  return tickets
    .slice()
    .sort((a, b) => a.price - b.price)
    .slice(0, 5);
}
// Получение первых пяти самых быстрых
function getFastestTickets(tickets) {
  return tickets
    .slice()
    .sort((a, b) => {
      return a.segments.reduce((prev, item) => prev.duration + item.duration)
        -
        b.segments.reduce((prev, item) => prev.duration + item.duration);
    })
    .slice(0, 5);
}

