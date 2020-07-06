import React from 'react'
import './style.css'
import FilterItem from './FIlterItem'

export default function Filter(props) {
  // TODO: использовать i18n-либы
  const _filterText = {
    all: 'Все',
    0: 'Без пересадок',
    1: '1 пересадка',
    2: '2 пересадки',
    3: '3 пересадки'
  }

  // Для вывода "Все" наверху (props.filters сортируется движком по лексиграф. порядку)
  const filters = Object.entries(props.filters).sort(a => -(a[0] === 'all'));
  // Для передачи текста label в едином пропсе FilterItem
  filters.map(item => item.push(_filterText[item[0]]));

  return (
    <form className="form filter">
      <h3 className="form__header">Количество пересадок</h3>
      {filters.map((item, index) => {
        return <FilterItem filter={item} onChange={(e) => props.onChange(e)} key={index} />
      })}
    </form>
  );
}