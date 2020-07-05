import React from 'react'
import './style.css'

export default function Tabs(props) {
  return (
    <ul className="tabs card" onClick={(e) => props.onClick(e)}>
      <li data-sorter="cheapest" className="tabs__item tabs__item_active">Самый дешевый</li>
      <li data-sorter="fastest" className="tabs__item">Самый быстрый</li>
    </ul>
  );
}