import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import WaitingTimer from './components/WaitingTimer'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import bufferingDecorator from './components/UI/handlers'

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
}

ReactDOM.render(<App />, document.getElementById('root'))