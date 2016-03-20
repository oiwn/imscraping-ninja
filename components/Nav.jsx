import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  render() {
    // TODO: actually according to https://goo.gl/PpO6ck
    // is's possible to use activeClassName in order
    // to change class for the current acitve route.
    const pathname = this.props.location.pathname;
    const navItems = this.props.items.map((item, index) => {
      const isActive = pathname === item.path;
      return (
        <li key={index}
            className={isActive ? 'current_page_item' : ''}>
          <Link to={item.path}>{item.name}</Link>
        </li>
      );
    });

    return (
      <nav id="nav-menu">
        <ul>
          {navItems}
        </ul>
      </nav>
    );
  }
}

export default Nav;
