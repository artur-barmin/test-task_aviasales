import React from 'react'

export default function FlightStops(props) {
  return (
    <div className="flight__block">
      <span className="text-grey">В пути</span>
      <span className="fw-bold">
        {getDuration(props.duration)}
      </span>
    </div>
  );
}
function getDuration(minutes) {
  const h = parseInt(minutes / 60);
  const m = Math.round((minutes / 60 - h) * 60);
  return `${h}ч ${m}м`;
}