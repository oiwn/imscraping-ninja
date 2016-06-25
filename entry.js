/* eslint-env browser, node */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import {
  Router, RouterContext, match,
  createMemoryHistory, browserHistory
} from 'react-router';
import routes from './routes.jsx';

// client side rendering
if (typeof document !== 'undefined') {
  // If need to load props from rendered page
  // const initialProps = JSON.parse(
  //   document.getElementById('initial-props').innerHTML);
  const initialProps = {};
  ReactDOM.render(
    <Router history={browserHistory} routes={routes} {...initialProps} />,
    document.getElementById('app')
  );
}

// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  const toHtml = (app) => {
    return `<html>
        <head>
          <title>Title</title>
          <link href="/styles.css" rel="stylesheet"></link>
        </head>
        <body>
          <div id="app">${app}</div>
          <script type="text/javascript" src="/bundle.js" charSet="utf-8">
          </script>
        </body>
      </html>`;
  };

  // could use ReactDOMServer.renderToString
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    callback(
      null,
      toHtml(
        ReactDOMServer.renderToString(<RouterContext {...renderProps} />)
      )
      // ReactDOMServer.renderToStaticMarkup(<RouterContext {...renderProps} />)
    );
  });
};
