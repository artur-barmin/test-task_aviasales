import React from 'react'
import './Preloader.css'

export default function Preloader() {
  return (
    <div className="row preloader__wrapper">
      <p className='preloader__descr'>Подождите, загружаем новые билеты</p>
      <div class="cssload-container">
        <div class="cssload-speeding-wheel"></div>
      </div>
    </div>
  )
}