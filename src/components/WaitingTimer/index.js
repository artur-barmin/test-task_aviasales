import React from 'react'
import './style.css'

export default function WaintingTimer() {
  return (
    <>
      <p className="timeout__tip">Ожидание ввода...</p>
      <div className='timeout'></div>
    </>
  );
}