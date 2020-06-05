import React from 'react'
import './style.css'

export default function Filter() {
  return(
    <form className="form filter" action="">
    <h3 className="form__header">Количество пересадок</h3>
    <div className="filter__item">
      <input className="filter__input" type="checkbox" name="" id="ticCh1" />
      <label className="filter__label" htmlFor="ticCh1">Все</label>
    </div>
    <div className="filter__item">
      <input className="filter__input" type="checkbox" name="" id="ticCh2" />
      <label className="filter__label" htmlFor="ticCh2">Без пересадок</label>
    </div>
    <div className="filter__item">
      <input className="filter__input" type="checkbox" name="" id="ticCh3" checked />
      <label className="filter__label" htmlFor="ticCh3">1 пересадка</label>
    </div>
    <div className="filter__item">
      <input className="filter__input" type="checkbox" name="" id="ticCh4" checked />
      <label className="filter__label" htmlFor="ticCh4">2 пересадки</label>
    </div>
    <div className="filter__item">
      <input className="filter__input" type="checkbox" name="" id="ticCh5" />
      <label className="filter__label" htmlFor="ticCh5">3 пересадки</label>
    </div>
  </form>
  );
}