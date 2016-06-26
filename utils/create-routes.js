/* @flow weak */
import path from 'path';

module.exports = (files) => {
  // filter jsx templates
  const allPages = files.filter(file => (
    path.extname(file.page) !== '.jsx' || path.extname(file.page) !== '.js')
  );

  // Remove files that start with an underscore as this indicates
  // the file shouldn't be turned into a page.
  const pages = allPages.filter(
    file => path.basename(file.page).slice(0, 1) !== '_');

  var uniqApps = [];
  allPages.forEach(value => {
    if (uniqApps.indexOf(value.directory) === -1) {
      uniqApps.push(value.directory);
    }
  });

  const routes = {
    path: '/',
    component: require('../containers').App,
    indexRoute: { component: require('../containers').Home },
    childRoutes: [
      {
        path: 'tech',
        component: require('../containers').Tech
      },
      {
        path: 'services',
        component: require('../containers').Services
      }
    ]
  };

  uniqApps.forEach(value => {
    const component = require(`../containers/${value}/index.js`);
    let newRoutes = {
      path: value,
      component: component.App,
      indexRoute: {
        component: component.List
      }
    };
    let articles = pages.filter(v => (v.directory === value)).map(
      v => v.page
    );
    newRoutes.childRoutes = [];
    articles.sort().forEach(v => {
      newRoutes.childRoutes.push({
        path: path.basename(v, '.md'),
        component: component.Details
      });
    });
    routes.childRoutes.push(newRoutes);
  });

  var paths = [];
  // extract all paths from routes
  const recursePaths = function(routes, prev) {
    if ('path' in routes) {
      if (prev === '/') {
        prev = '';
      }
      paths.push(path.join(prev, routes.path));
    }
    if ('childRoutes' in routes) {
      routes.childRoutes.map(route => recursePaths(route, routes.path));
    }
  };
  recursePaths(routes, '');

  return {
    paths: paths,
    routesObj: routes
  };
}
