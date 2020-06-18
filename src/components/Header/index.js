import React from 'react'
import logo from './logo_aviasales.svg'
import './style.css'

export default function Header() {
  return (
    <div className="logo center">
      <p className=" timeout__tip">Ожидание ввода...</p>
      <div className='timeout'>
      </div>
      <img src={logo} alt='' style={{ width: '82px' }} />
    </div>
  );
}