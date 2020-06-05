import React from 'react';
import './style.css';

export default function Ticket() {
  return (
    <div className="card ticket">
      <div className="row row_btwn">
        <span className="price">13 400 р</span>
        <div className="logo-iata">
          <img src='./logo_s7.png' alt="" />
        </div>
        </div>
        <div className="flight row">
          <div className="flight__block">
            <span className="text-grey">MOW - HKT</span>
            <span className="fw-bold">10:45 - 08:00</span>
          </div>
          <div className="flight__block">
            <span className="text-grey">В пути</span>
            <span className="fw-bold">21ч 15м</span>
          </div>
          <div className="flight__block">
            <span className="text-grey">2 пересадки</span>
            <span className="fw-bold">HKG, JNB</span>
          </div>
        </div>
        <div className="flight row">
          <div className="flight__block">
            <span className="text-grey">MOW - HKT</span>
            <span className="fw-bold">11:20 - 00:50</span>
          </div>
          <div className="flight__block">
            <span className="text-grey">В пути</span>
            <span className="fw-bold">13ч 30м</span>
          </div>
          <div className="flight__block">
            <span className="text-grey">1 пересадка</span>
            <span className="fw-bold">HKG</span>
          </div>
        </div>
      </div>
  );
}