import React from 'react';
import radium from 'radium';
import Nav from './Nav.jsx';
import Container from './Layout.jsx';

const styles = {
  header: {
    overflow: 'hidden',
    padding: '1em 0em',
    background: '#333 no-repeat center',
    backgroundSize: 'cover',
    marginBottom: '1em'
  }
};

class Header extends React.Component {
  render() {
    const navItems = [
      { path: '/', name: 'Home' },
      { path: '/tech', name: 'Tech' },
      { path: '/services', name: 'Serices' }
    ];

    return (
      <header style={styles.header}>
        <Container>
          <div style={{ position: 'absolute', marginTop: 20 }}>
            <p>G+</p>
          </div>

          <Nav items={navItems} location={this.props.location} />

          <div id="logo" className="header-show-hide">
            <h1><a href="/">Web Scraping Service</a></h1>
            <span>by GrabLab Team</span>
          </div>

        </Container>
      </header>
    );
  }
}

export default radium(Header);
