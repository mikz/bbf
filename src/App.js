import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

export class App extends Component {
  render () {
    return (
      <div>
        <ul>
          <li><Link to="taps">Taps</Link></li>
          <li><Link to="beers">Beers</Link></li>
        </ul>

        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
