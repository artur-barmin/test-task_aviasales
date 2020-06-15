import React, { Component } from 'react'

export default class Flight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: []
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.details !== state.details && props.details !== undefined) {
      return {
        details: props.details
      };
    }
    return null;
  }
  render() {
    const flights = this.state.details
      .map((segment, i) => {
        return (
          <div key={i} className="flight row">
            <div className="flight__block">
              <span className="text-grey">
                {`${segment.origin} - ${segment.destination}`}
              </span>
              <span className="fw-bold">{getHours(segment.date, segment.duration)}</span>
            </div>
            <div className="flight__block">
              <span className="text-grey">В пути</span>
              <span className="fw-bold">
                {getDuration(segment.duration)}
              </span>
            </div>
            <div className="flight__block">
              <span className="text-grey">
                {describeStops(segment.stops)}
              </span>
              <span className="fw-bold">
                {segment.stops.map(
                  (item, i) => {
                    const result = i > 0 ? `, ${item}` : item;
                    return result;
                  }
                )}
              </span>
            </div>
          </div>
        );
      })
    return flights;
    // return (
    //   <div className="flight row">
    //     <div className="flight__block">
    //       {/* <span className="text-grey">MOW - HKT</span> */}
    //       <span className="text-grey">
    //         {`${this.state.details[0].origin} - ${this.state.details[0].destination}`}
    //       </span>
    //       <span className="fw-bold">10:45 - 08:00</span>
    //     </div>
    //     <div className="flight__block">
    //       <span className="text-grey">В пути</span>
    //       <span className="fw-bold">21ч 15м</span>
    //     </div>
    //     <div className="flight__block">
    //       <span className="text-grey">2 пересадки</span>
    //       <span className="fw-bold">HKG, JNB</span>
    //     </div>
    //   </div>
    // );
  }
}
function getDuration(minutes) {
  const h = parseInt(minutes / 60);
  const m = Math.round((minutes / 60 - h) * 60);
  return `${h}ч ${m}м`;
}
function describeStops(arr) {
  switch (arr.length) {
    case 1: return '1 пересадка';
    case 2: return '2 пересадки';
    case 3: return '3 пересадки';
    default: return 'Без пересадок';
  }
}
function getHours(timeTakeoff, minutesDuration) {
  const start = new Date(timeTakeoff);
  const end = new Date(Date.parse(timeTakeoff) + minutesDuration * 60 * 1000);

  const stH = start.getHours() < 10 ? '0' + start.getHours() : start.getHours();
  const stM = start.getMinutes() < 10 ? '0' + start.getMinutes() : start.getMinutes();

  const endH = end.getHours() < 10 ? '0' + end.getHours() : end.getHours();
  const endM = end.getMinutes() < 10 ? '0' + end.getMinutes() : end.getMinutes();
  return `${stH}:${stM} - ${endH}:${endM}`;
}