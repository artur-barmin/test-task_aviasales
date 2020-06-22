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
      filters: { all: true, 0: false, 1: false, 2: false, 3: false },
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
  getValidCheckboxes(e) {
    const FILTERS = this.state.filters;
    const id = e.target.id;
    // Предотвращение состояния "все фильтры отключены"
    if (FILTERS[id] && Object.entries(FILTERS).filter(item => item[0] !== id).every(item => !item[1])) {
      return FILTERS;
    }
    // Отключение фильтра "Все" в случае клика по любому другому
    if (FILTERS['all'] && !FILTERS[id] && id !== 'all') {
      const st = Object.assign({}, this.state);
      st.filters['all'] = false;
      st.filters[id] = !st.filters[id];
      return st.filters;
    }
    // Отключение всех фильтров в случае клика по "Все", кроме него
    if (id === 'all' && Object.values(FILTERS).some(item => item)) {
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
    st.filters[id] = !st.filters[id];
    return st.filters;
  }
}
// хелпер для извлеченного метода bufferingDecorator
function updateState(context, newState) {
  context.setState(() => newState);
}
// обеспечивает продлевающуюся задержку
function rebootableDelayDecorator(ms, funcStart, funcEnd) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    if (funcStart) {
      funcStart(...args);
    }
    timer = setTimeout(() => {
      funcEnd(...args);
      clearTimeout(timer);
    }, ms);
  }
}
// --------------------------------------
// Буферизация кликов перед установкой стейта (и последующим запросом билетов)
// Зачем: плохо дёргать сервер на каждое движение юзера
// UPD: больше не упражняться с замыканиями, ну нафиг
const bufferingDecorator = (context, ms) => {
  const BUFFER = Object.assign({}, context.state);
  const UIbufferFilters = new Set();
  const setStateAfterDelay = rebootableDelayDecorator(ms, null, updateState);
  const showWaitingTimerWhileDelay = rebootableDelayDecorator(ms, css_runWT, css_stopWT);
  const highlightCheckboxWhileDelay = rebootableDelayDecorator(ms, css_cbON, css_cbOFF);
  return (e) => {
    // Сохранение в буфер состояния контролов на момент последнего клика
    if (e.currentTarget.classList.contains('tabs')) {
      BUFFER.sort = e.target.dataset.sorter;
      highlightActiveTab(e);
    } else {
      BUFFER.filters = context.getValidCheckboxes(e);
    }
    // запуск таймера и анимации перед записью буфера в стейт
    showWaitingTimerWhileDelay();
    highlightCheckboxWhileDelay(UIbufferFilters, e);
    setStateAfterDelay(context, BUFFER);
  }
}
// ***Подсветка кликнутых чекбоксов while delay***
// Задача: мгновенный UI-фидбек на клик (переключить CSS-класс)
// Проблема: это управляемый компонент
// Как связать удаление .buffered с обновлением state.filters?
// вариант 1: передавать delay в highlightFilterWhileDelay
// вариант 2: props.filters
// UPD: выбрал 1й вариант. Проблема: рассинхрон с getValidCheckboxes
function css_cbON(stor, e) {
  const cssClass = 'buffered';
  if (e.target.matches('.' + cssClass)) {
    stor.delete(e.target);
    e.target.classList.remove(cssClass);
  } else {
    stor.add(e.target);
    e.target.classList.add(cssClass);
  }
}
function css_cbOFF(store) {
  const cssClass = 'buffered';
  store.forEach(item => item.classList.remove(cssClass));
  store.clear();
}
// *** Бегущая строка в верху экрана ***
function css_runWT() {
  const bufferAnim = document.querySelector('.timeout');
  const animTip = document.querySelector('.timeout__tip');
  animTip.className = 'timeout__tip';
  bufferAnim.className = 'timeout';
  animTip.classList.add('timeout__tip_run');
  bufferAnim.classList.add('timeout_run');
}
function css_stopWT() {
  const bufferAnim = document.querySelector('.timeout');
  const animTip = document.querySelector('.timeout__tip');
  animTip.classList.remove('timeout__tip_run');
  bufferAnim.classList.remove('timeout_run');
}
// ***Подсветка активного таба***
function highlightActiveTab(e) {
  const cssClass = 'tabs__item_active';
  if (e.target.classList.contains(cssClass)) {
    return;
  } else {
    e.currentTarget.querySelector('.' + cssClass).classList.remove(cssClass);
    e.target.classList.add(cssClass);
  }
}

ReactDOM.render(<App />, document.getElementById('root'))