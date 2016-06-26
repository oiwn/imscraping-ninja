/* eslint-env node */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  RouterContext, match, createMemoryHistory
} from 'react-router';
import router, { routes } from './routes.jsx';

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

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    callback(
      null,
      toHtml(
        ReactDOMServer.renderToString(<RouterContext {...renderProps} />)
      )
    );
  });
};
