/* eslint-env browser */
/* eslint quote-props: [2, "as-needed"] */
import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header location={this.props.location} />
        <main className="app">{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  location: React.PropTypes.object.isRequired,
  children: React.PropTypes.element.isRequired
}

export default App;
