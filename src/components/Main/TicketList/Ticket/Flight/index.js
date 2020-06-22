import React from 'react'
import FlightOrigDest from './FlightOrigDest'
import FlightStops from './FlightStops'
import FlightDuration from './FlightDuration'

export default function Flight(props) {
  return props.details.map((segment, i) => {
    return (
      <div key={i} className="flight row">
        <FlightOrigDest segment={segment} />
        <FlightDuration duration={segment.duration} />
        <FlightStops stops={segment.stops} />
      </div>
    );
  })
}