import React from 'react';
import './style.css';
import logo from './logo_s7.png'
import Flight from '../Flight'

export default function Ticket() {
  return (
    <div className="card ticket">
      <div className="row row_btwn">
        <span className="price">13 400 р</span>
        <div className="logo-iata">
          <img src={logo} alt="" />
        </div>
        </div>
        <Flight />
        <Flight />
      </div>
  );
}