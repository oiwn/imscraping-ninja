import React from 'react';
import { Route } from 'react-router';
/* import { App, Home, Tech, Services } from './containers';*/
/* import { articleRoutes } from './pages/articles/articles.jsx';*/
import config from './config.loader';
import createRoutes from './utils/create-routes.js';

/* const { paths, routesObj } = createRoutes(globPaes('articles'));*/

const { pages } = JSON.parse(config());
const { paths, routesObj } = createRoutes(pages);
const router = (
  <Route routes={routesObj} />
);

export const allPaths = paths;
export const routes = routesObj;
export default router;
