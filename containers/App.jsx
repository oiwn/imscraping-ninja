/* eslint-env browser */
/* eslint quote-props: [2, "as-needed"] */
import React from 'react';
import radium, { Style } from 'radium';
import '../assets/styles.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const styles = {
  body: {
    background: '#333',
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: '1.2rem',
    fontWidth: '400',
    color: '#3A4145'
  },
  'h1, h2, h3, h4, h5': {
    marginBottom: '0.5em'
  }
};

class App extends React.Component {
  render() {
    /* const initialProps = {
       __html: JSON.stringify({ a: 1 })
       }; */
    /* const initialProps = {
       __html: JSON.stringify(this.props)
       };
     */
    /* <script id="initial-props" type="application/json"
       dangerouslySetInnerHTML={initialProps} />
     */

    const appBody = (
      <div>
        <Header location={this.props.location} />
        <main className="app">{this.props.children}</main>
        <Footer />
      </div>
    );

    // Client side rendering
    if (typeof document !== 'undefined') {
      return (<div id="app">{appBody }</div>);
    }

    // Render whole page for server side
    return (
      <html radiumConfig={{ userAgent: 'googlebot' }}>
        <head>
          <title>{this.props.title}</title>
          <link href="styles.css" rel="stylesheet"></link>
        </head>
        <body>
          <div id="app">
            {appBody}
          </div>
          <script type="text/javascript" src="bundle.js" charSet="utf-8">
          </script>
        </body>
      </html>
    );
  }
}

export default radium(App);
