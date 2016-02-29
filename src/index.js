import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import { App, Home } from './App';
import { Beers } from './Beers';
import { Taps, TapVote } from './Taps';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="beers" component={Beers}/>
      <Route path="taps" component={Taps} count={70}>
        <Route path=":beerId" component={TapVote}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('root'))
