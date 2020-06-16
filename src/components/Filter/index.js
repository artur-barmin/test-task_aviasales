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
    // TODO: добавить мгновенный UI-фидбек на клик. Функция с переключением классов + CSS
    this.props.onChange(e);
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