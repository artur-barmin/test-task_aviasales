import React from 'react'
import './style.css'

export default function Filter()  {
  return (
    <form className="form filter" action="">
      <h3 className="form__header">Количество пересадок</h3>
      <div className="filter__item">
        <input className="filter__input" type="checkbox" name="" id="filterAll" />
        <label className="filter__label" htmlFor="filterAll">Все</label>
      </div>
      <div className="filter__item">
        <input className="filter__input" type="checkbox" name="" id="filterZero" />
        <label className="filter__label" htmlFor="filterZero">Без пересадок</label>
      </div>
      <div className="filter__item">
        <input className="filter__input" type="checkbox" name="" id="filterOne" />
        <label className="filter__label" htmlFor="filterOne">1 пересадка</label>
      </div>
      <div className="filter__item">
        <input className="filter__input" type="checkbox" name="" id="filterTwo" />
        <label className="filter__label" htmlFor="filterTwo">2 пересадки</label>
      </div>
      <div className="filter__item">
        <input className="filter__input" type="checkbox" name="" id="filterThree" />
        <label className="filter__label" htmlFor="filterThree">3 пересадки</label>
      </div>
    </form>
  );
}