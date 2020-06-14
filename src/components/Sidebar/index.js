import React, { Component } from 'react'
import Filter from '../Filter'

export default class Sidebar extends Component {
  render() {
    return (
      <div className="card row__col-side">
        <Filter
          filters={this.props.filters}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}