import React from 'react'
import './style.css'

export default function Filter(props) {
  return (
    <form className="form filter">
      <h3 className="form__header">Количество пересадок</h3>
      {renderFilterItems(props)}
    </form>
  );
}
function handleClick(e, props) {
  highlightBuffered(e, props.timeout);
  props.onChange(e);
}
// Задача: мгновенный UI-фидбек на клик (переключить CSS-класс)
// Вопрос: как связать удаление .buffered с обновлением state.filters?
// вариант 1: передавать delay в this.highlightBuffered
// вариант 2: props.filters
// UPD: выбрал 1. Проблемы:  
// - отдельные таймеры (исчезают не одновременно) 
// - нет отклика на повторный клик. 
function highlightBuffered(e, ms) {
  let watchingCheckbox = e.target;
  watchingCheckbox.classList.add('buffered');
  setTimeout(() => { watchingCheckbox.classList.remove('buffered'); }, ms)
}
function renderFilterItems(props) {
  // WARN: не перенести ли это в index.js в конструктор?
  const _filterText = {
    all: 'Все',
    0: 'Без пересадок',
    1: '1 пересадка',
    2: '2 пересадки',
    3: '3 пересадки'
  }
  const FILTER_RAW = Object
    .entries(props.filters)
    // WARN: а можно без сортировки?
    .sort((a, b) => { if (a[0] === 'all') return -1; return 0; });
  const FILTER_ITEMS = [];
  for (let i = 0; i < FILTER_RAW.length; i += 1) {
    const [filterName, filterStatus] = FILTER_RAW[i];
    FILTER_ITEMS.push(
      <div className="filter__item" key={i}>
        <input className="filter__input" type="checkbox"
          id={filterName}
          checked={filterStatus}
          onChange={(e) => handleClick(e, props)}
        />
        <label className="filter__label" htmlFor={filterName}>
          {_filterText[filterName]}
        </label>
      </div>
    );
  }
  return FILTER_ITEMS;
}