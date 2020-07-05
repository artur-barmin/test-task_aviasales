import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import WaitingTimer from './components/WaitingTimer'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import * as UI from './components/UI'

class App extends Component {
  state = {
    sort: "cheapest",
    filters: {
      all: true,
      0: false,
      1: false,
      2: false,
      3: false
    },
  }
  _timeoutBeforeSearch = 2000;

  render() {
    // Дает время пользователю кликнуть нужные параметры поиска перед
    // 1. записью нового состояния контролов в стейт
    // 2. последующим запросом билетов (используется Main.componentDidUpdate)
    // Зачем: чтобы не дергать сервер после каждого движения юзера
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

// после каждого клика перезапускает время для анимаций и setState
const rebootableDelayDecorator = (ms, functionsStart, functionsEnd) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    if (functionsStart.length > 0) {
      functionsStart.forEach(func => func(...args));
    }
    timer = setTimeout(() => {
      functionsEnd.forEach(func => func(...args));
      clearTimeout(timer);
    }, ms);
  }
}

// хелпер для передачи контекста bufferingDecorator
const updateState = (context, newState) => {
  context.setState(() => newState);
}

const bufferingDecorator = (context, ms) => {
  
  // *Буфер сохраняет желаемые параметры поиска
  const BUFFER = Object.assign({}, context.state);
  const setStateAfterDelay = rebootableDelayDecorator(ms, [], [updateState]);

  // *Визуальная обратная связь для юзера на время таймаута
  // Set используется в UI.highlightCheckboxOn/Off: обработка UI отделена от состояния контролов,
  // т.к. завязаться на стейт не вариант - есть таймаут, а обратную связь надо сразу
  const bufferForUI = new Set();
  const showVisualFeedback = rebootableDelayDecorator(
    ms,
    [UI.highlightCheckboxOn, UI.runWaitingTimer],
    [UI.highlightCheckboxOff, UI.stopWaitingTimer]
  );

  return (e) => {
    // Сохранение состояния контролов на момент ПОСЛЕДНЕГО клика
    if (e.currentTarget.classList.contains('tabs')) {
      BUFFER.sort = e.target.dataset.sorter;
      UI.highlightActiveTab(e);
    } else {
      BUFFER.filters = context.getValidCheckboxes(e);
    }
    showVisualFeedback(bufferForUI, e);
    setStateAfterDelay(context, BUFFER);
  }
}

ReactDOM.render(<App />, document.getElementById('root'))