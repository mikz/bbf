import React, { Component } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';


export default class Navigation extends Component {

  constructor (props) {
    super(props);
    this.state = {open: false};
  }

  /*handleToggle () {
   this.setState({open: !this.state.open});
   }*/


  render () {
    let handleToggle = () => this.setState({open: !this.state.open});
    let style = {
      buttonStyle: {
        width: '100%'
      }
    }
    return (
      <div>
        <AppBar
          title="Le BBF App"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onTitleTouchTap={handleToggle}
        />
        <LeftNav open={this.state.open}>
          <MenuItem onTouchTap={handleToggle}><FlatButton style={style.buttonStyle} label={<Link to={"/taps"}>On Tap NOW</Link>} /></MenuItem>
          <MenuItem onTouchTap={handleToggle}><FlatButton style={style.buttonStyle} label={<Link to={"/beers"}>All Beers</Link>} /></MenuItem>
        </LeftNav>
      </div>
    );
  }

}
