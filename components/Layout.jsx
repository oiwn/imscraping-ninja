/* eslint-env es6 */
import React from 'react';

const styles = {
  container: {
    margin: '0 auto',
    width: '86%'
  }
};

class Container extends React.Component {
  render() {
    return (<div style={styles.container}>{this.props.children}</div>);
  }
}

export default Container;
