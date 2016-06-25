import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, Tech, Projects, Services } from './containers';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="tech" component={Tech} />
    <Route path="services" component={Services} />
  </Route>
);

export default routes;
