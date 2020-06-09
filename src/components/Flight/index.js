import React from 'react'

export default function Flight() {
  return (
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
  );
}