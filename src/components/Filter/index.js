import React, { Component } from 'react'
import './style.css'

export default class Filter extends Component {
  _filterText = {
    all: 'Все',
    zero: 'Без пересадок',
    one: '1 пересадка',
    two: '2 пересадки',
    three: '3 пересадки'
  }
  renderFilterItems() {
    let filterItems = Object.entries(this.props.filters);
    let result = [];
    for (let i = 0; i < filterItems.length; i += 1) {
      const filterName = filterItems[i][0];
      const filterStatus = filterItems[i][1];
      result.push(
        <div className="filter__item" key={filterName}>
          <input
            id={filterName}
            className="filter__input"
            type="checkbox"
            name=""
            checked={filterStatus}
            onChange={this.props.onChange}
          />
          <label
            className="filter__label"
            htmlFor={filterName}
          >
            {this._filterText[filterName]}
          </label>
        </div>
      );
    }
    return result;
  }
  render() {
    return (
      <form className="form filter" action="">
        <h3 className="form__header">Количество пересадок</h3>
        {this.renderFilterItems()}
      </form>
    );
  }
}