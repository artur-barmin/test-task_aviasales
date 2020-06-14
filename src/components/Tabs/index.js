import React, { Component } from 'react'
import './style.css'

export default class Tabs extends Component {
  render() {
    return (
      <ul
        className="tabs card"
        onClick={this.props.onClick}
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
}