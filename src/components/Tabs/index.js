import React, { Component } from 'react'
import './style.css'

export default class Tabs extends Component {
  render() {
    return (
      <ul
        className="tabs card"
        onClick={(e) => this.handleClick(e)}
      >
        <li
          data-sorter="cheapest"
          className="tabs__item tabs__item_active"
        >Самый дешевый</li>
        <li
          data-sorter="fastest"
          className="tabs__item"
        >Самый быстрый</li>
      </ul>
    );
  }
  handleClick(e) {
    this.highlight(e);
    this.props.onClick(e);
  }
  // WARN: если mouseDown на табе, а mouseUp вне, то this=undefined
  // UPD: неактуально, но следить
  highlight(e) {
    const cssClass = 'tabs__item_active';
    if (e.target.classList.contains(cssClass)) {
      return;
    } else {
      // (от)подключение стилей для (де)активированной сортировки
      e.currentTarget.querySelector('.' + cssClass).classList.remove(cssClass);
      e.target.classList.add(cssClass);
      // WARN: удалить позже, если не понадобится
      // this.setState({ sort: e.target.dataset.sorter });
    }
  }
}