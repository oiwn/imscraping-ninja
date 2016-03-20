/* eslint-env browser */
import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // define component level class
    this.styles = {
      body: {
        background: '#333',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontSize: '1.2rem',
        fontWidth: '400',
        color: '#3A4145'
      }
    };
  }

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
      <div pathname={this.props.location.pathname}>
        <Header location={this.props.location} />
        <main className="app">{this.props.children}</main>
        <Footer />
      </div>
    );

    // Client side rendering
    if (typeof document !== 'undefined') {
      return <div>{appBody}</div>;
    }

    // Render whole page for server side
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link href="styles.css" rel="stylesheet" type="text/css" />
        </head>
        <body style={this.styles.body}>
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

export default App;
