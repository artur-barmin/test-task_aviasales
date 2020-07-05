import React from 'react'
import Ticket from './Ticket'
import Preloader from './Preloader'

export default function TicketList(props) {
  if (!props.ticketsArray) {
    return <Preloader />
  }
  return (
    <div className='tickets'>
      {props.ticketsArray.map((item, i) => <Ticket ticketInfo={item} key={i} />)}
    </div>
  );

}