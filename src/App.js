import React, { Component } from 'react';
import { NICE, SUPER_NICE } from './colors';
import { Router, Route, Link, browserHistory } from 'react-router'

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

import Firebase from 'firebase'

var database = new Firebase('https://luminous-torch-2948.firebaseio.com/');
Firebase.enableLogging(true);

import RaisedButton from 'material-ui/lib/raised-button';

const MyAwesomeReactComponent = () => (
  <RaisedButton label="Default" />
);

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <h1 style={{ color: this.props.color }}>
        Counter ({this.props.increment}): {this.state.counter}
      </h1>
    );
  }
}

class Tap extends Component {
  constructor(props) {
    super(props)
    this.id = props.id
  }

  render() {
    return (
      <GridTile>
        foo: {this.id}
      </GridTile>
    )
  }
}

class Taps extends Component {
  constructor(props) {
    super(props)
    this.count = props.route.count
    this.taps = new Array(this.count).fill(null).map((_, id) => id)
  }

  render() {
    return (
      <div>
        <h1>List of {this.count} Taps</h1>
        <GridList cols={5}>
          {this.taps.map(id => <Tap key={id} id={id}/>) }
        </GridList>
      </div>
    )
  }
}

class Counters extends Component {
  render() {
    return (
      <div>
        <Counter increment={1} color={NICE} />
        <Counter increment={50} color={SUPER_NICE} />
      </div>
    )
  }
}
class Navigation extends Component {
  render () {
    return (
      <div>
        <ul>
          <li><Link to="taps">Taps</Link></li>
          <li><Link to="counters">Counters</Link></li>
          <li><Link to="taps">Taps</Link></li>
        </ul>

        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

class TapVote extends Component {
  render() {
    return (<h1>Editing Tap</h1>)
  }
}

export class App extends Component {
  render() {
    return (
    <Router history={browserHistory}>
      <Route path="/" component={Navigation}>
        <Route path="counters" component={Counters}/>
        <Route path="taps" component={Taps} count={50}>
          <Route path=":beerId" component={TapVote}/>
        </Route>
      </Route>
    </Router>
    );
  }
}
