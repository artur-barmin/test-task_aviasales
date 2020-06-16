import React, { Component } from 'react'
import Ticket from '../Ticket'

export default class TicketList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: {
        all: [],
        0: [],
        1: [],
        2: [],
        3: []
      },
    }
  }

  render() {
    const tickets = this.state.tickets.all
      .map((item, i) => {
        while (i < 5) {
          return <Ticket ticketInfo={item} key={i} />
        }
        return null;
      });
    return (
      <div className='tickets'>
        {tickets}
      </div>
    );
  }

  // async componentDidMount() {
  //   console.warn('ОБНОВЛЕНИЕ КОМПОНЕНТА');
  //   let temp = await fillSet();
  //   for (let key in temp.tickets) {
  //     temp.tickets[key] = this.props.sort === 'cheapest' ? getCheapestTickets(temp.tickets[key]) : getFastestTickets(temp.tickets[key]);
  //   }
  //   this.setState(temp);
  // }

  async componentDidMount() {
    let url = new URL('https://front-test.beta.aviasales.ru');
    let entryPath = new URL('/search', url);
    let searchPath = new URL('/tickets?searchId=', url);
    // WARN: буферизация, передывал под версию с буфером 16 jun, 19:50,
    // // получаем все билеты и фильтруем в массивы
    // let rawTickets = {
    //   tickets: {
    //     all: [],
    //     0: [],
    //     1: [],
    //     2: [],
    //     3: []
    //   },
    // }
    let id = await getSearchID(entryPath);
    const path = searchPath + id;
    console.group('получаем новые билеты...');
    console.log('search ID: ' + id + ', URL:', path);
    // получаем ВСЕ билеты
    let ticketsAll = await getTicketList(path);

    // ФИЛЬТРАЦИЯ! ----------------
    let rawFiltered = [];
    if (this.props.filters.all = true) {
      rawFiltered = ticketsAll;
    } else {
      let targetFilters = Object.entries(this.props.filters).filter(item => item[1] === true);
      console.log('здесь должны быть фильтры из пропсов, которые true', targetFilters);
      for (let ticket of ticketsAll) {
        
        // если ticket.stops удовлетворяет фильтрам (от 1 до 4 одновременно) из пропсов,
        // то записываем его в let rawFiltered
      }
    }
    // ФИЛЬТРАЦИЯ! ----------------

    // WARN: буферизация, передывал под версию с буфером 16 jun, 19:50,
    // // Сортировка ПОДмножества "все билеты"
    // let sortedTicketsAll = this.props.sort === "cheapest" ? getCheapestTickets(ticketsAll) : getFastestTickets(ticketsAll);
    // // Сохраняем ПОДмножества "все билеты" в стейт
    // rawTickets.tickets.all.push(...sortedTicketsAll);
    // // Сортировка всех остальных ПОДмножеств
    // for (let i = 0; i < 4; i += 1) {
    //   rawTickets.tickets[i] = this.props.sort === "cheapest" ? 
    //   getCheapestTickets(getFilteredBy(ticketsAll, i)) : 
    //   getFastestTickets(getFilteredBy(ticketsAll, i));
    // }
    console.groupEnd();
    // WARN: буферизация, передывал под версию с буфером 16 jun, 19:50,
    // this.setState(rawTickets);
  }
}

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
    if (i === 100) {
      console.warn('СЧЕТЧИК', i)
    }
    let pack = await getPack(url);
    stop = pack.stop;
    store.push(...pack.tickets);
    if (stop) {
      console.warn('searching success! stop:', pack.stop, ', count of tickets:', store.length);
    }
  }
  return store;
}
// Получаем пачку билетов
async function getPack(url) {
  let req = await fetch(url);
  if (req.status === 500) {
    return await getPack(url);
  }
  return await req.json();
}
// ФИЛЬТРАЦИЯ по пересадкам
// Как считается кол-во пересадок: т.к. билеты "туда + обратно", то берется максимальное
// количество пересадок на любом из этих двух полётов
// NOTE: хотел использовать Set для оптимизированного формирования мн-в. Вроде 23мс, не особо надо
// let ids = new Set(ticketsAll.map((item, index) => index < 10 ? index : null));
function getFilteredBy(ticketsArr, targetStops) {
  return ticketsArr.filter(
    ticket => {
      return Math.max(
        ticket.segments[0].stops.length,
        ticket.segments[1].stops.length
      ) === targetStops;
    }
  )
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