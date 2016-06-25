/* eslint-env browser */
/* eslint quote-props: [2, "as-needed"] */
import React from 'react';
/* import '../assets/styles.css';*/
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

    return React.cloneElement(appBody);
  }
}

export default App;
