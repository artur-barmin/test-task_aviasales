import React from 'react'

export default function FlightStops(props) {
  return (
    <div className="flight__block">
      <span className="text-grey">
        {describeStops(props.stops)}
      </span>
      <span className="fw-bold">
        {props.stops.map((item, i) => i > 0 ? ', '+item : item)}
      </span>
    </div>
  );
}
function describeStops(arr) {
  switch (arr.length) {
    case 1: return '1 пересадка';
    case 2: return '2 пересадки';
    case 3: return '3 пересадки';
    default: return 'Без пересадок';
  }
}