import React from 'react'
import Filter from '../Filter'

export default function Sidebar(props) {
  return (
    <div className="card row__col-side">
      <Filter
        filters={props.filters}
        onChange={props.onChange}
      />
    </div>
  );
}