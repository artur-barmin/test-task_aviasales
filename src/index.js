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
    
    // Это замыкание даёт время юзеру прокликать все нужные контролы,
    // и только потом запросить билеты с сервера.
    // Зачем: плохо дёргать сервер на каждое движение пользователя =>
    // => надо поменьше писать в стейт, как вариант.
    let handleSearchParams = this.bufferingDecorator(this._timeoutBeforeSearch);

    return (
      <div className='container'>
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <Sidebar
            filters={this.state.filters}
            onChange={handleSearchParams}
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
  bufferingDecorator(ms) {
    const TIMEOUT_TO_SETSTATE = ms;
    const SAVED_THIS = this;
    // инициализация буферов
    // WARN: а нужны отдельные буферы? Мб один на весь стейт?
    let bufferSort = this.state.sort;
    let bufferFilters = Object.assign({}, this.state.filters);
    // Таймеры объяв-ся здесь для сброса в начале обработчика
    let bufferTimer;
    let animTimer;

    return function (e) {
      // Сброс таймеров на случай, если это не первый клик
      clearTimeout(bufferTimer);
      clearTimeout(animTimer);
      // Перезапись буфера новым состоянием контролов на момент клика
      if (e.currentTarget.classList.contains('tabs')) {
        bufferSort = e.target.dataset.sorter;
      } else {
        bufferFilters = SAVED_THIS.getNewFilter(e);
        highlightBuffered(e, TIMEOUT_TO_SETSTATE)
      }
      // запуск анимации ожидания
      let bufferAnim = document.querySelector('.timeout');
      let animTip = document.querySelector('.timeout__tip');
      animTip.className = 'timeout__tip';
      bufferAnim.className = 'timeout';
      animTip.classList.add('timeout__tip_run');
      bufferAnim.classList.add('timeout_run');
      animTimer = setTimeout(() => {
        animTip.classList.remove('timeout__tip_run');
        bufferAnim.classList.remove('timeout_run');
      }, SAVED_THIS._timeoutBeforeSearch);
      // запуск таймера
      bufferTimer = setTimeout(() => {
        SAVED_THIS.setState(state => {
          let newState = Object.assign({}, state);
          newState.sort = bufferSort;
          newState.filters = bufferFilters;
          return newState;
        });
        // WARN: нужно ли удалять таймер по айди в конце выполнения?
        clearTimeout(bufferTimer);
      }, TIMEOUT_TO_SETSTATE);
    }
  }
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
// Задача: мгновенный UI-фидбек на клик (переключить CSS-класс)
// Вопрос: как связать удаление .buffered с обновлением state.filters?
// вариант 1: передавать delay в this.highlightBuffered
// вариант 2: props.filters
// UPD: выбрал 1. Проблемы:  
// - отдельные таймеры (исчезают не одновременно) 
// - нет отклика на повторный клик. 
function highlightBuffered(e, ms) {
  let watchingCheckbox = e.target;
  watchingCheckbox.classList.add('buffered');
  setTimeout(() => { watchingCheckbox.classList.remove('buffered'); }, ms)
}

ReactDOM.render(<App />, document.getElementById('root'))