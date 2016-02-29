import React, { Component } from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

class TapVote extends Component {
  render() {
    return (<h1>Editing Tap</h1>)
  }
}


export class Tap extends Component {
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

export class Taps extends Component {
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
