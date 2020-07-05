import React from 'react';

function FilterItem(props) {
  const [ filterName, filterStatus, labelText ] = props.filter;
  return (
    <div className="filter__item" key={filterName}>
        <input className="filter__input" type="checkbox"
          id={filterName}
          checked={filterStatus}
          onChange={(e) => props.onChange(e)}
        />
        <label className="filter__label" htmlFor={filterName}>
          {labelText}
        </label>
      </div>
  );
}

export default FilterItem;