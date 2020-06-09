import React, { Component } from 'react'

import Tabs from '../Tabs'
import TicketList from '../TicketList'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort:     "cheapest",
      filters:  ["all"],
    }
  }
  handleChangeSorting(e) {
    const cssClass = 'tabs__item_active';
    if (e.target.classList.contains(cssClass)) {
      console.log('сортировка уже активна');
      return;
    } else {
      e.currentTarget.querySelector('.' + cssClass)
      .classList.remove(cssClass);
      e.target.classList.add(cssClass);
      this.setState({sort: e.target.dataset.sorter});
    }
  }
  render() {
    return(
      <div className="main row__col-main">
        <Tabs onClick={(e) => this.handleChangeSorting(e)} />
        <TicketList />
      </div>
    )
  }
}
