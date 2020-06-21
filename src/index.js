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
  _timeoutBeforeSearch = 2000;
  render() {
    let handleSearchParams = bufferingDecorator(this, this._timeoutBeforeSearch);
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
// Это замыкание даёт время юзеру прокликать все нужные контролы,
// и только потом запросить билеты с сервера.
// Зачем: плохо дёргать сервер на каждое движение пользователя =>
// => надо поменьше писать в стейт, как вариант.
// Буфер сохраняет последний клик и обновляет время ожидания
const bufferingDecorator = (context, ms) => {
  const delaySetState         = rebootableDelayDecorator(ms, null, updateState);
  const runAnimationWhenDelay = rebootableDelayDecorator(ms, runTimerUI, stopTimerUI);
  const BUFFER = Object.assign({}, context.state);
  return (e) => {
    // Сохранение в буфер состояния контролов на момент последнего клика
    if (e.currentTarget.classList.contains('tabs')) {
      BUFFER.sort = e.target.dataset.sorter;
      highlightTabs(e);
    } else {
      BUFFER.filters = context.getCorrectFilters(e);
      highlightBuffered(e, ms)
    }
    // запуск таймера и анимации перед записью буфера в стейт
    runAnimationWhenDelay();
    delaySetState(context, BUFFER);
  }
}
// 
function rebootableDelayDecorator(ms, funcStart, funcEnd) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    if (funcStart) {
      funcStart.call(this, ...args);
    }
    timer = setTimeout(() => funcEnd(...args), ms)
  }
}
function updateState(context, newState) {
  context.setState(() => newState);
}
function runTimerUI() {
  let bufferAnim = document.querySelector('.timeout');
  let animTip = document.querySelector('.timeout__tip');
  animTip.className = 'timeout__tip';
  bufferAnim.className = 'timeout';
  animTip.classList.add('timeout__tip_run');
  bufferAnim.classList.add('timeout_run');
}
function stopTimerUI() {
  let bufferAnim = document.querySelector('.timeout');
  let animTip = document.querySelector('.timeout__tip');
  animTip.classList.remove('timeout__tip_run');
  bufferAnim.classList.remove('timeout_run');
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