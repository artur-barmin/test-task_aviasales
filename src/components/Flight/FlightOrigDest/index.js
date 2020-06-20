import React from 'react'

export default function FlightStops(props) {
  return (
    <div className="flight__block">
      <span className="text-grey">
        {`${props.segment.origin} - ${props.segment.destination}`}
      </span>
      <span className="fw-bold">
        {getTakeoffLandingTime(props.segment.date, props.segment.duration)}
      </span>
    </div>
  );
}
function getTakeoffLandingTime(timeTakeoff, minutesDuration) {
  const start = new Date(timeTakeoff);
  const end = new Date(Date.parse(timeTakeoff) + minutesDuration * 60 * 1000);

  const stH = start.getHours()    < 10 ? '0' + start.getHours()   : start.getHours();
  const stM = start.getMinutes()  < 10 ? '0' + start.getMinutes() : start.getMinutes();
  const endH = end.getHours()     < 10 ? '0' + end.getHours()     : end.getHours();
  const endM = end.getMinutes()   < 10 ? '0' + end.getMinutes()   : end.getMinutes();

  return `${stH}:${stM} - ${endH}:${endM}`;
}