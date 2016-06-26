import path from 'path';
import globPages from './utils/glob-pages.js';
import buildRoutes from './utils/create-routes.js';

/* const cb = (d, pd) => {
 *   const pr = (p) => console.log(p);
 *   var routes = buildRoutes(pd, pr);
 *   console.log(routes);
 * };
 * var pages = globPages('articles', cb);
 * */
const files = [ { directory: 'articles',
    page: 'pages/articles/_2016-10-12-article2.md' },
  { directory: 'articles',
    page: 'pages/articles/_templates/articles.jsx' },
  { directory: 'articles',
    page: 'pages/articles/_templates/routes.jsx' },
  { directory: 'articles',
    page: 'pages/articles/2016-05-24-article2.md' },
  { directory: 'articles',
    page: 'pages/articles/2016-09-22-article1.md' } ];

var { paths, routesObj } = buildRoutes(globPages('articles'));
console.log(paths);
console.log(routesObj);


/* buildRoutes(
 *   [
 *     './pages/articles/articles.jsx',
 *     './containers/Home.jsx',
 *     './containers/About.jsx'
 *   ],
 *   pr
 * );*/
