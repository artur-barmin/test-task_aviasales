import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './style.css'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: "cheapest",
      filters: {
        all: true,
        0: false,
        1: false,
        2: false,
        3: false
      },
    }
  }
  _timeoutBeforeSearch = 2000;
  render() {
    // Это замыкание загоняет в буфер всё, что юзер накликает за N миллисекунд.
    // Зачем: плохо дёргать сервер на каждое движение пользователя =>
    // => надо поменьше писать в стейт, как вариант.
    let handleSearchParams = this.bufferClicks(this._timeoutBeforeSearch);
    return (
      <div className='container'>
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <Sidebar
            filters={this.state.filters}
            onChange={handleSearchParams}
            timeout={this._timeoutBeforeSearch}
          />
          <Main
            onClick={handleSearchParams}
            filters={this.state.filters}
            sort={this.state.sort}
          />
        </div>
      </div>
    )
  }
  // -----------------------
  // WARN: А НАФИГА мне замыкание? Я и с ним вызываю буферизатор, который переписывает... или нет... 65 строка, короче.
  // Бррр, нагородил.
  // Ладно, для начала дописать визуальный отклик фильтров, а потом этим заняться
  bufferClicks(ms) {
    const TIMEOUT_TO_SETSTATE = ms;
    const SAVED_THIS = this;

    // инициализация буферов
    let bufferSort = this.state.sort;
    let bufferFilters = Object.assign({}, this.state.filters);

    return function launchTimer(e) {
      // фиксация момента клика
      // let firstClickTime = Date.now();
      // console.log('click FIRED, time:', firstClickTime);

      // Буферизация изменений на каждый клик
      if (e.currentTarget.classList.contains('tabs')) {
        bufferSort = e.target.dataset.sorter;
      } else {
        bufferFilters = SAVED_THIS.getNewFilter(e);
      }
      // запуск таймера
      setTimeout(() => {
        // TODO: сброс буферов???
        SAVED_THIS.setState(state => {
          let newState = Object.assign({}, state);

          newState.sort = bufferSort;
          newState.filters = bufferFilters;

          return newState;
        })
      }, TIMEOUT_TO_SETSTATE);

      // добавление событий в соотв. BUFFER_ + очистка таймера + перезапуск таймера
      // if ((Date.now() - firstClickTime) < TIMEOUT_TO_SETSTATE) {
      //   // TODO: добавление событий в буферы
      //   clearTimeout(timer);
      //   launchTimer(e);
      // }
    }
  }
  // -----------------------
  // Управление поведением фильтра + возврат списка активных фильтров
  getNewFilter(e) {
    const filterID = e.target.id;
    // Предотвращение состояния "все фильтры отключены"
    if (
      this.state.filters[filterID] === true
      &&
      Object.entries(this.state.filters)
        .filter(item => item[0] !== filterID)
        .every(item => item[1] === false)
    ) {
      let st = Object.assign({}, this.state);
      return st.filters;
    }
    // Отключение фильтра "Все" в случае клика по любому другому
    if (
      this.state.filters['all'] === true
      &&
      this.state.filters[filterID] === false
      &&
      filterID !== 'all'
    ) {
      const st = Object.assign({}, this.state);
      st.filters.all = false;
      st.filters[filterID] = !st.filters[filterID];
      return st.filters;
    }
    // Отключение всех фильтров в случае клика по "Все", кроме него
    if (
      filterID === 'all'
      &&
      Object.values(this.state.filters)
        .some(item => item === true)
    ) {
      const st = Object.assign({}, this.state);
      for (let key in st.filters) {
        if (st.filters.hasOwnProperty(key)) {
          st.filters[key] = false;
        }
      }
      st.filters.all = true;
      return st.filters;
    }
    // Активация фильтров во всех других случаях
    const st = Object.assign({}, this.state);
    st.filters[filterID] = !st.filters[filterID];
    return st.filters;
  }
}


ReactDOM.render(<App />, document.getElementById('root'))