import React, { Component } from 'react'

import Tabs from './Tabs'
import TicketList from './TicketList'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: null
    }
  }
  render() {
    return (
      <div className="main row__col-main">
        <Tabs
          onClick={this.props.onClick}
        />
        <TicketList
          ticketsArray={this.state.tickets}
        />
      </div>
    )
  }
  async componentDidMount() {
    const defaultTicketList = await this.getTickets();
    this.setState({ tickets: defaultTicketList })
  }
  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ tickets: null })
      const newTicketList = await this.getTickets();
      this.setState({ tickets: newTicketList })
    }
  }
  async getTickets(sort = this.props.sort, filters = this.props.filters) {
    const origin = new URL('https://front-test.beta.aviasales.ru');
    const hrefEntryAPI = new URL('/search', origin);
    const hrefSearchAPI = new URL('/tickets?searchId=', origin);

    const searchID = await getSearchID(hrefEntryAPI);

    console.group('получаем новые билеты...');
    console.log('searchID: ' + searchID + ', URL:', hrefSearchAPI + searchID);

    let tickets = await loadAllTickets(hrefSearchAPI + searchID);
    tickets = filterTickets(tickets, filters);
    tickets = (sort === "cheapest" ? sortByPrice : sortByDuration)(tickets);

    console.groupEnd();

    return tickets.slice(0, 5);
  }
}

// --------------------------------------
async function getSearchID(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json.searchId;
}
async function loadAllTickets(url) {
  const store = [];
  for (let stop = false, safeCounter = 0; stop !== true && safeCounter < 100; safeCounter += 1) {
    // на случай infinite loop, несколько раз приходилось hard reset
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
  if (req.status === 500) {
    return await loadPack(searchSessionURL);
  }
  return await req.json();
}

// --------------------------------------
function filterTickets(tickets, activeFilters) {
  // Критерий: наибольшее число пересадок (по любому из направлений) соотв-ет активному фильтру
  // WARN: если активны все 4, то лишняя обработка, т.к 4 фильтра === 1 фильтр 'all'
  if (activeFilters['all']) {
    return tickets;
  }
  const neededStops = Object.entries(activeFilters).filter(item => item[1]).map(item => +item[0]);
  return tickets.filter(ticket => neededStops.includes(getMaxStopsOf(ticket)));
}
function getMaxStopsOf(ticket) {
  return Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length);
}

function sortByPrice(tickets) {
  return tickets
    .slice()
    .sort((a, b) => a.price - b.price);
}
function sortByDuration(tickets) {
  return tickets
    .slice()
    .sort((a, b) => {
      return a.segments.reduce((prev, item) => prev.duration + item.duration)
        -
        b.segments.reduce((prev, item) => prev.duration + item.duration);
    });
}




