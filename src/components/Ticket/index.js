import React from 'react';
import './style.css';
import Flight from '../Flight'

export default function Ticket(props) {
  return (
    <div className="card ticket">
      <div className="row row_btwn">
        <span className="price">
          {props.ticketInfo.price} Р
          </span>
        <div className="logo-iata">
          <img
            src={`http://pics.avs.io/99/36/${props.ticketInfo.carrier}.png`}
            alt={props.ticketInfo.carrier} />
        </div>
      </div>
      <Flight details={props.ticketInfo.segments} />
    </div>
  );
}