/* eslint-env browser, node */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App, Home, Tech, Services } from './containers';
/* import { routes } from './routes.jsx';*/

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="tech" component={Tech} />
    <Route path="services" component={Services} />
  </Route>
);

// client side rendering
if (typeof document !== 'undefined') {
  // If need to load props from rendered page
  // const initialProps = JSON.parse(
  //   document.getElementById('initial-props').innerHTML);
}

const initialProps = {};
ReactDOM.render(
  <Router history={browserHistory} routes={routes} {...initialProps} />,
  document.getElementById('app')
);
