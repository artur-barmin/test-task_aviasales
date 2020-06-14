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
        zero: false,
        one: false,
        two: false,
        three: false
      },
    }
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
  }

  render() {
    return (
      <div className='container'>
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <Sidebar
            filters={this.state.filters}
            onChange={this.handleChangeFilter}
          />
          <Main
            onClick={this.handleChangeSort}
            filters={this.state.filters}
            sort={this.state.sort}
          />
        </div>
      </div>
    )
  }

  // WARN: если mouseDown на табе, а mouseUp вне, то this=undefined
  handleChangeSort(e) {
    const cssClass = 'tabs__item_active';
    if (e.target.classList.contains(cssClass)) {
      return;
    } else {
      // отключение стилей для деактивированной сортировки
      e.currentTarget.querySelector('.' + cssClass)
        .classList.remove(cssClass);
      // подключение стилей для активированной сортировки
      e.target.classList.add(cssClass);
      this.setState({ sort: e.target.dataset.sorter });
    }
  }

  handleChangeFilter(e) {
    const filterID = e.target.id;
    // Предотвращение состояния "все фильтры отключены"
    if (
      this.state.filters[filterID] === true
      &&
      Object.entries(this.state.filters)
        .filter(item => item[0] !== filterID)
        .every(item => item[1] === false)
    ) {
      return;
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
      this.setState(st);
      return;
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
      this.setState(st);
      return;
    }

    // Активация фильтров во всех других случаях
    const st = Object.assign({}, this.state);
    st.filters[filterID] = !st.filters[filterID];
    this.setState(st);
  }
}


ReactDOM.render(<App />, document.getElementById('root'))