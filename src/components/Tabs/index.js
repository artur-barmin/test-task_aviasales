import React from 'react'
import './style.css'

export default function Tabs() {
  return (
    <ul className="tabs card">
      <li className="tabs__item tabs__item_active">Самый дешевый</li>
      <li className="tabs__item">Самый быстрый</li>
    </ul>
  );
}