import React, { Component } from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import { browserHistory } from 'react-router'

export default class DialogExampleModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      open: true
    };
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
    browserHistory.push('/taps')
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <Dialog
        title="Dialog With Actions"
        actions={actions}
        modal={true}
        open={this.state.open}
      >
        Only actions can close this dialog.
      </Dialog>
    );
  }
}

import { Link } from 'react-router'

export class TapVote extends Component {
  render() {
    return (<DialogExampleModal/>)
  }
}

const tapStyle = {

}

export class Tap extends Component {
  constructor(props) {
    super(props)
    this.id = props.id
    this.title = this.id
  }

  render() {
    return (
      <GridTile
        title={<h1>{this.title}</h1>}
        titlePosition="bottom"
        actionIcon={<Link to={`/tap/${this.id}`}>Vote</Link>}
      >
        <h1 style={tapStyle}>{this.id}</h1>
      </GridTile>
    )
  }
}

export class Taps extends Component {
  constructor(props) {
    super(props)
    this.count = props.route.count
    this.taps = new Array(this.count).fill(null).map((_, id) => id + 1)
  }

  render() {
    return (
      <div>
        {this.props.children}
        <h1>List of {this.count} Taps</h1>
        <GridList cols={5}>
          {this.taps.map(id => <Tap key={id} id={id}/>) }
        </GridList>
      </div>
    )
  }
}
