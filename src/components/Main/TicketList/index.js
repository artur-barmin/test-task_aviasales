import React from 'react'
import Ticket from './Ticket'

export default function TicketList(props) {
  if (!props.ticketsArray) {
    return <p className='row'>Подождите, загружаем новые билеты</p>;
  }
  return (
    <div className='tickets'>
      {props.ticketsArray.map((item, i) => <Ticket ticketInfo={item} key={i} />)}
    </div>
  );

}