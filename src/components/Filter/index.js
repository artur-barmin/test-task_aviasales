import React, { Component } from 'react'
import './style.css'

export default class Filter extends Component {
  render() {
    return (
      <form className="form filter">
        <h3 className="form__header">Количество пересадок</h3>
        {this.renderFilterItems()}
      </form>
    );
  }
  handleClick(e) {
    this.highlightBuffered(e, this.props.timeout);
    this.props.onChange(e);
  }
  // TODO: добавить мгновенный UI-фидбек на клик. Функция с переключением CSS-классов
  // как связать удаление .buffered с обновлением state.filters?
  // вариант 1: передавать delay в this.highlightBuffered
  // вариант 2: фильтры ж нам и так передаются в пропсах? мб на них завязать?
  // UPD: выбрал 1. Проблемы: 
  // - отдельные таймеры (исчезают не одновременно) 
  // - нет отклика на повторный клик. 
  // Че, пацаны, closure?
  highlightBuffered(e, ms) {
    let watchingCheckbox = e.target;
    watchingCheckbox.classList.add('buffered');
    setTimeout(() => {watchingCheckbox.classList.remove('buffered');}, ms)
  }
  renderFilterItems() {
    const FILTER_RAW = Object.entries(this.props.filters);
    const FILTER_ITEMS = [];
    for (let i = 0; i < FILTER_RAW.length; i += 1) {
      const [filterName, filterStatus] = FILTER_RAW[i];
      FILTER_ITEMS.push(
        <div className="filter__item" key={i}>
          <input className="filter__input" type="checkbox"
            id={filterName}
            checked={filterStatus}
            onChange={(e) => this.handleClick(e)}
          />
          <label className="filter__label" htmlFor={filterName}>
            {this._filterText[filterName]}
          </label>
        </div>
      );
    }
    return FILTER_ITEMS;
  }
  _filterText = {
    all: 'Все',
    zero: 'Без пересадок',
    one: '1 пересадка',
    two: '2 пересадки',
    three: '3 пересадки'
  }
}