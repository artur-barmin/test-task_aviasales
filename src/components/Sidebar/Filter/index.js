import React from 'react'
import './style.css'

export default function Filter(props) {
  // WARN: лучше использовать i18n-либы
  const _filterText = {
    all: 'Все',
    0: 'Без пересадок',
    1: '1 пересадка',
    2: '2 пересадки',
    3: '3 пересадки'
  }
  return (
    <form className="form filter">
      <h3 className="form__header">Количество пересадок</h3>
      {renderFilterItems(props, _filterText)}
    </form>
  );
}
function renderFilterItems(props, content) {
  // Сортировка нужна из-за перемешивания движком строковых полей объекта App.state.filters
  // WARN: вариант без сортировки?
  const FILTER_RAW = Object.entries(props.filters).sort(a => -(a[0] === 'all'));
  return FILTER_RAW.map((item, index) => {
    const [filterName, filterStatus] = item;
    return (
      <div className="filter__item" key={index}>
        <input className="filter__input" type="checkbox"
          id={filterName}
          checked={filterStatus}
          onChange={(e) => handleClick(e, props)}
        />
        <label className="filter__label" htmlFor={filterName}>
          {content[filterName]}
        </label>
      </div>
    )
  })
}
function handleClick(e, props) {
  props.onChange(e);
}