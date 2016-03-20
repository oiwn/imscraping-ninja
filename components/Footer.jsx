import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div id="footer">
          <div className="title">
            <h2>Email us and describe your problem!</h2>
            <span className="byline">
              We'll check and message back with estimated time and price
            </span>
          </div>

          <p>
            &copy; imWebScraping.ninja 2008-2015. All rights reserved.
            {' '}|{' '}Dev by <a href="http://grablab.org/">GrabLab</a>.
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
