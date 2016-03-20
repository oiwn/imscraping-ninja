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

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    callback(
      null,
      ReactDOMServer.renderToString(<RouterContext {...renderProps} />)
    );
  });
};
