import React from 'react'
import Ticket from '../Ticket'

export default function TicketList(tickets) {
  return (
    <div className='tickets'>
      <Ticket />
      <Ticket />
    </div>
  );
}