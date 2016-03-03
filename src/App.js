import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import Navigation from './Navigation';

export class App extends Component {
  render () {
    return (
      <div>
        <Navigation/>
        {this.props.children}
      </div>
    )
  }
}
