import React from 'react'
import logo from './logo_aviasales.svg'

export default function Header() {
  return (
      <div className="logo center">
        <img src={logo} alt='' style={{width: '82px'}} />
      </div>
  );
}