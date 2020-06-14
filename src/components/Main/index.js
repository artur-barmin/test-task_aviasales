import React, { Component } from 'react'

import Tabs from '../Tabs'
import TicketList from '../TicketList'

export default class Main extends Component {
  render() {
    return (
      <div className="main row__col-main">
        <Tabs onClick={this.props.onClick} />
        <TicketList
          filters={this.props.filters}
          sort={this.props.sort}
        />
      </div>
    )
  }
}
