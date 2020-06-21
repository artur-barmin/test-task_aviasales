import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './style.css'

import WaitingTimer from './components/WaitingTimer'
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
  render() {
    let handleSearchParams = this.bufferingDecorator(this._timeoutBeforeSearch);
    return (
      <div className='container'>
        <WaitingTimer />
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
  _timeoutBeforeSearch = 2000;
  // Это замыкание даёт время юзеру прокликать все нужные контролы,
  // и только потом запросить билеты с сервера.
  // Зачем: плохо дёргать сервер на каждое движение пользователя =>
  // => надо поменьше писать в стейт, как вариант.
  bufferingDecorator = (ms) => {
    let buffer = Object.assign({}, this.state);
    // Таймеры объяв-ся здесь для сброса первым делом, если это не 1й клик
    let bufferTimer;
    let runWaitingTimer = waitingTimerDecorator(ms);
    return (e) => {
      clearTimeout(bufferTimer);
      // Перезапись буфера новым состоянием контролов на момент клика
      if (e.currentTarget.classList.contains('tabs')) {
        buffer.sort = e.target.dataset.sorter;
        highlightTabs(e);
      } else {
        buffer.filters = this.getCorrectFilters(e);
        highlightBuffered(e, ms)
      }
      // запуск анимации ожидания
      runWaitingTimer();
      // запуск таймера записи буфера
      bufferTimer = setTimeout(() => {
        this.setState(() => buffer);
        // WARN: нужно ли удалять таймер в конце выполнения?
        clearTimeout(bufferTimer);
      }, ms);
    }
  }

  // Проверка (можно ли изменить состояние чекбокса) и возврат всех чекбоксов
  getCorrectFilters(e) {
    const FILTERS = this.state.filters;
    const filterID = e.target.id;
    // Предотвращение состояния "все фильтры отключены"
    if (FILTERS[filterID] && Object.entries(FILTERS).filter(item => item[0] !== filterID).every(item => !item[1])) {
      return FILTERS;
    }
    // Отключение фильтра "Все" в случае клика по любому другому
    if (FILTERS['all'] && !FILTERS[filterID] && filterID !== 'all') {
      const st = Object.assign({}, this.state);
      st.filters['all'] = false;
      st.filters[filterID] = !st.filters[filterID];
      return st.filters;
    }
    // Отключение всех фильтров в случае клика по "Все", кроме него
    if (filterID === 'all' && Object.values(FILTERS).some(item => item)) {
      const st = Object.assign({}, this.state);
      for (let item in st.filters) {
        if (st.filters.hasOwnProperty(item)) {
          st.filters[item] = false;
        }
      }
      st.filters['all'] = true;
      return st.filters;
    }
    // Активация фильтров во всех других случаях
    const st = Object.assign({}, this.state);
    st.filters[filterID] = !st.filters[filterID];
    return st.filters;
  }
}
function waitingTimerDecorator(ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    let bufferAnim = document.querySelector('.timeout');
    let animTip = document.querySelector('.timeout__tip');
    animTip.className = 'timeout__tip';
    bufferAnim.className = 'timeout';
    animTip.classList.add('timeout__tip_run');
    bufferAnim.classList.add('timeout_run');
    timer = setTimeout(() => {
      animTip.classList.remove('timeout__tip_run');
      bufferAnim.classList.remove('timeout_run');
    }, ms);
  }
}
// ***Временная подсветка кликнутых чекбоксов***
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
// ***Подсветка активного таба***
function highlightTabs(e) {
  const cssClass = 'tabs__item_active';
  if (e.target.classList.contains(cssClass)) {
    return;
  } else {
    e.currentTarget.querySelector('.' + cssClass).classList.remove(cssClass);
    e.target.classList.add(cssClass);
  }
}

ReactDOM.render(<App />, document.getElementById('root'))