/* eslint-env browser */
/* eslint quote-props: [2, "as-needed"] */
import React from 'react';
import '../assets/styles.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

class App extends React.Component {
  render() {
    const appBody = (
      <div>
        <Header location={this.props.location} />
        <main className="app">{this.props.children}</main>
        <Footer />
      </div>
    );

    // Client side rendering
    if (typeof document !== 'undefined') {
      return (<div id="app">{appBody}</div>);
    }

    // Render whole page for server side
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link href="/styles.css" rel="stylesheet"></link>
        </head>
        <body>
          <div id="app">
            {appBody}
          </div>
          <script type="text/javascript" src="/bundle.js" charSet="utf-8">
          </script>
        </body>
      </html>
    );
  }
}

export default App;
