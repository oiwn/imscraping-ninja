import React from 'react';
import Nav from './Nav.jsx';

class Header extends React.Component {
  render() {
    const navItems = [
      { path: '/', name: 'Home' },
      { path: '/tech', name: 'Tech' },
      { path: '/services', name: 'Serices' }
    ];

    return (
      <header id="header">
        <div className="container">
          <div style={{ position: 'absolute', marginTop: 20 }}>
            <p>G+</p>
          </div>

          <Nav items={navItems} location={this.props.location} />

          <div id="logo" className="header-show-hide">
            <h1><a href="/">Web Scraping Service</a></h1>
            <span>by GrabLab Team</span>
          </div>

        </div>
      </header>
    );
  }
}

export default Header;
