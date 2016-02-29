import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


import { App, Home } from './App';
import { Beers, Beer } from './Beers';
import { Taps, TapVote } from './Taps';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="beers" component={Beers}>

      </Route>
      <Route path="/beer/:beerKey" component={Beer}/>
      <Route path="taps" component={Taps} count={70}>
        <Route path="/tap/:beerId" component={TapVote}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('root'))
