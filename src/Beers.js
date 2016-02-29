import React, { Component } from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import List from 'material-ui/lib/lists/list';
import Subheader from 'material-ui/lib/Subheader/Subheader';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import * as Colors from 'material-ui/lib/styles/colors'
import { Link } from 'react-router';

import Firebase from 'firebase'

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={Colors.grey400} />
  </IconButton>
);

const Helpers = {
  storeLocal: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  getLocal: (key) => {
    return JSON.parse(localStorage.getItem(key));
  }
};

export class Beers extends Component {

  constructor (props) {
    super(props);
    this.state = {
      lang: 'en',
      beers: [],
      breweries: []
    };
    this.beersRef = new Firebase('https://luminous-torch-2948.firebaseio.com/beers');
    this.breweriesRef = new Firebase('https://luminous-torch-2948.firebaseio.com/breweries');
    this.getBeers().then((beers) => this.setState({beers}));
    this.getBreweries().then((breweries) => this.setState({breweries}));
  }

  render() {
    let beers = this.state.beers;

    return (
      <div>
        <List>
          <Subheader>BFF Beers</Subheader>
          {
            beers.map(beer => {
              return (<div key={beer.key}><ListItem to={`/beer/${beer.key}`}
                leftAvatar={<Avatar src="http://barcelonabeerfestival.com/images/cerveses/logos/CAP-BREWERY.png" />}
                rightIconButton={<Link to={`/beer/${beer.key}`}>{iconButtonElement}</Link>}
                primaryText={beer.name}
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>{beer.brewery.name}</span><br/>
                    {beer[`description_${this.state.lang}`]}
                  </p>
                }
                secondaryTextLines={2}
              />
              <Divider inset={true} /></div>
              )
            })
          }
        </List>
      </div>
    )
  }

  getBeers () {
    let beers = Helpers.getLocal('beers');
    if (!beers) {
      //only for dev
      this.beersRef = this.beersRef.startAt().limit(5);
      return new Promise((resolve, _reject) => {
        this.beersRef.once("value", (snapshot) => {
          beers = [];
          snapshot.forEach((childSnapshot) => {
            let beer = childSnapshot.val();
            beer.key = childSnapshot.key();
            beers.push(beer);
          });
          Helpers.storeLocal('beers', beers);
          resolve(beers);
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
      });
    } else {
      return Promise.resolve(beers);
    }
  }

  getBreweries () {
    let breweries = Helpers.getLocal('breweries');
    if (!breweries) {
      //only for dev
      this.breweriesRef = this.breweriesRef.startAt().limit(5);
      return new Promise((resolve, _reject) => {
        this.breweriesRef.once("value", (snapshot) => {
          let breweries = [];
          snapshot.forEach((childSnapshot) => {
            let brewery = childSnapshot.val();
            brewery.key = childSnapshot.key();
            breweries.push(brewery)
          });
          Helpers.storeLocal('breweries', breweries);
          resolve(breweries);

        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
      })
    } else {
      return Promise.resolve(breweries);
    }

  }

}

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

export class Beer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      lang: 'en',
      beer: {}
    };
    this.beerKey = `${props.params.beerKey}`;
    this.getBeer().then((beer) => this.setState({beer}));
  }

  render() {
    let beer = this.state.beer;
    return (
      <Card>
        <CardHeader
          title={`${beer.name} - ${beer.brewery.name}`}
          subtitle={beer.style}
          avatar="http://lorempixel.com/100/100/nature/"
        />
        <CardMedia
          overlay={<CardTitle title={`${beer.name}`} subtitle={beer.style} />}
        >
          <img src="http://lorempixel.com/600/337/nature/" />
        </CardMedia>
        <CardTitle title={`${beer.name} @ ${beer.brewery.name}`} subtitle={beer.style} />
        <CardText>
          {beer[`description_${this.state.lang}`]}
        </CardText>
        <CardActions>
          <FlatButton primary={true} linkButton={true} href="/beers" label="Back to Beers!" />
        </CardActions>
      </Card>
    )
  }

  getBeer () {
    let beer = Helpers.getLocal(`beer${this.beerKey}`);
    if (!beer) {
      this.beerRef = new Firebase(`https://luminous-torch-2948.firebaseio.com/beers/${this.beerKey}`);
      return new Promise((resolve, _reject) => {
        this.beerRef.once("value", (snapshot) => {
          beer = snapshot.val();
          Helpers.storeLocal(`beer${this.beerKey}`, beer);
          resolve(beer);
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
      });
    } else {
      return Promise.resolve(beer);
    }
  }
}
