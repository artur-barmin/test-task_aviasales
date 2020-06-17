import React, { Component } from 'react'

import Tabs from '../Tabs'
import TicketList from '../TicketList'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowRender: false,
      _buf: null
    }
  }
  render() {
    return (
      <div className="main row__col-main">
        <Tabs onClick={this.props.onClick} />
        <TicketList
          ticketsArray={this.state._buf}
        />
      </div>
    )
  }
  // static getDerivedStateFromProps(props, state) {
  //   if (props.filters !== state.filters && props.filters !== undefined && props.sort !== state.sort && props.sort !== undefined) {
  //     return {sort: props.sort, filters: props.filters, allowRender: false}
  //   }
  //   return null;
  // }
  async componentDidMount() {
    let a = await this.askServer(this.props.sort);
    this.setState(state => { return { allowRender: true, _buf: a } })
  }
  async componentDidUpdate(prevProps) {
    if (
      prevProps !== this.props
    ) {
      this.setState(() => { return { allowRender: false, _buf: null } })
      let a = await this.askServer(this.props.sort);
      this.setState(() => { return { allowRender: true, _buf: a } })
    }
  }
  // componentWillUnmount() {
  //   this.setState(state => {return {allowRender: false, _buf: null}})
  // }
  async askServer(sort = this.props.sort, filters = this.props.filters) {
    let url = new URL('https://front-test.beta.aviasales.ru');
    let entryPath = new URL('/search', url);
    let searchPath = new URL('/tickets?searchId=', url);
    let id = await getSearchID(entryPath);
    const path = searchPath + id;
    console.group('получаем новые билеты...');
    console.log('search ID: ' + id + ', URL:', path);
    // получаем ВСЕ билеты
    let ticketsAll = await getTicketList(path);
    // ФИЛЬТР
    let rawFiltered = [];
    if (filters.all === true) {
      rawFiltered = ticketsAll;
    } else {
      // Возвращает массив чисел, которые означают нужное количество пересадок.
      let targetFilters = Object.entries(filters)
        .filter(item => item[0] !== 'all')
        .filter(item => item[1] === true)
        .map(item => +item[0]);
      // Если билет содержит хоть одно число из массива, то билет успешно проходит фильтр
      // удовлетворяет ли ticket.stops фильтрам (от 1 до 4 одновременно) из пропсов
      // WARN: если активны все 4, то лишняя обработка, т.к 4 фильтра === 1 фильтр 'all'
      rawFiltered = ticketsAll.filter(ticket => targetFilters.includes(getMaxStops(ticket)));
    }
    // СОРТ + урезает до 5
    let resultTicketList = sort === "cheapest" ?
      cheapest(rawFiltered) :
      fastest(rawFiltered);

    console.groupEnd();

    // this.setState(state => {
    //   const t = Object.assign({}, state); 
    //   t.tickets = resultTicketList;
    //   return t;
    // });
    return await resultTicketList;
  }

}
function getMaxStops(ticket) {
  return Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length);
}
function getSearchID(url) {
  return fetch(url)
    .then(res => res.json())
    .then(json => json.searchId);
}
async function getTicketList(url) {
  let store = [];
  for (let stop = false, i = 0; stop !== true && i < 100; i += 1) {
    if (i === 100) {
      console.warn('СЧЕТЧИК', i)
    }
    let pack = await fetchTicketPack(url);
    stop = pack.stop;
    store.push(...pack.tickets);
    if (stop) {
      console.warn('searching success! stop:', pack.stop, ', count of tickets:', store.length);
    }
  }
  return store;
}
async function fetchTicketPack(url) {
  let req = await fetch(url);
  if (req.status === 500) {
    return await fetchTicketPack(url);
  }
  return await req.json();
}
function cheapest(tickets) {
  return tickets
    .slice()
    .sort((a, b) => a.price - b.price)
    .slice(0, 5);
}
function fastest(tickets) {
  return tickets
    .slice()
    .sort((a, b) => {
      return a.segments.reduce((prev, item) => prev.duration + item.duration)
        -
        b.segments.reduce((prev, item) => prev.duration + item.duration);
    })
    .slice(0, 5);
}




