import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import WaitingTimer from './components/WaitingTimer'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import * as UI from './components/UI'

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
        3: false },
    }
  }
  _timeoutBeforeSearch = 2000;
  render() {

    // Дает время пользователю кликнуть нужные параметры поиска перед
    // 1. записью нового состояния контролов в стейт
    // 2. последующим запросом билетов (используется Main.componentDidUpdate)
    const handleSearchParams = bufferingDecorator(this, this._timeoutBeforeSearch);

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
  // Проверка "можно ли изменить состояние фильтра" тк частично исключают друг друга
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

// Буферизация кликов перед установкой стейта (и последующим запросом билетов)
// Зачем: плохо дёргать сервер на каждое движение юзера
// Способ: замыкания. Не повторять, ну нафиг, лучше state / shouldUpdate / ref
const bufferingDecorator = (context, ms) => {

  // Буфер состояния контролов для setState
  const BUFFER = Object.assign({}, context.state);
  const setStateAfterDelay = rebootableDelayDecorator(ms, null, updateState);

  // WARN: отрефакторить. Буфер только чекбоксов и только для переключения
  // CSS-класса (не вариант checked=true, тк инпуты управляемые)
  const uiBuffer = new Set();
  const highlightCheckboxWhileDelay = rebootableDelayDecorator(ms, UI.css_cbON, UI.css_cbOFF);
  // ---------------

  // Бегущая строка вверху экрана
  const showWaitingTimerWhileDelay = rebootableDelayDecorator(ms, UI.css_runWT, UI.css_stopWT);

  return (e) => {
    // Сохранение в буфер состояния контролов на момент последнего клика
    if (e.currentTarget.classList.contains('tabs')) {
      BUFFER.sort = e.target.dataset.sorter;
      UI.highlightActiveTab(e);
    } else {
      BUFFER.filters = context.getValidCheckboxes(e);
    }
    // запуск таймера и анимации перед записью буфера в стейт
    showWaitingTimerWhileDelay();
    highlightCheckboxWhileDelay(uiBuffer, e);
    setStateAfterDelay(context, BUFFER);
  }
}
// хелпер для извлеченного метода bufferingDecorator
function updateState(context, newState) {
  context.setState(() => newState);
}

// перезапускает таймер ожидания ввода после каждого клика
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

ReactDOM.render(<App />, document.getElementById('root'))