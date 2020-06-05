import React from 'react'

import Tabs from '../Tabs'
import TicketList from '../TicketList'

export default function Main() {
  return(
    <div className="main row__col-main">
      <Tabs />
      <TicketList />
    </div>
  );
}