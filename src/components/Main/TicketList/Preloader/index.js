import React from 'react'
import './style.css'

export default function Preloader() {
  return (
    <div className="row preloader__wrapper">
      <p className='preloader__descr'>Подождите, загружаем новые билеты</p>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ margin: 'auto', background: 'rgba(241, 242, 243, 0)', display: 'block', shapeRendering: 'auto' }} width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" r="32" stroke-width="2" stroke="#2196f3" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round" transform="rotate(140.358 50 50)">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.564102564102564s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
        </circle>
      </svg>
    </div>
  )
}