import React, { Component } from 'react'
import Tabs from './Tabs'
import TicketList from './TicketList'
import getTickets from './getTickets'

export default class Main extends Component {
  state = {
    tickets: null
  }
  render() {
    return (
      <div className="main row__col-main">
        <Tabs onClick={this.props.onClick} />
        <TicketList ticketsArray={this.state.tickets} />
      </div>
    )
  }
  async componentDidMount() {
    const defaultTicketList = await getTickets(this.props.sort, this.props.filters);
    this.setState({ tickets: defaultTicketList });
  }
  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ tickets: null });
      const newTicketList = await getTickets(this.props.sort, this.props.filters);
      this.setState({ tickets: newTicketList });
    }
  }
}