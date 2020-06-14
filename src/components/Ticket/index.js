import React, { Component } from 'react';
import './style.css';
import logo from './logo_s7.png'
import Flight from '../Flight'

export default class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketInfo: {}
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.ticketInfo !== state.ticketInfo && props.ticketInfo !== undefined) {
      return {
        ticketInfo: props.ticketInfo
      };
    }
    return null;
  }
  render() {
    return (
      <div className="card ticket">
        <div className="row row_btwn">
          <span className="price">
            {`${this.state.ticketInfo.price} Р`}
          </span>
          <div className="logo-iata">
            <img src={`http://pics.avs.io/99/36/${this.state.ticketInfo.carrier}.png`} alt={this.state.ticketInfo.carrier} />
          </div>
        </div>
        <Flight details={this.state.ticketInfo.segments} />
        {/* <Flight /> */}
      </div>
    );
  }
}