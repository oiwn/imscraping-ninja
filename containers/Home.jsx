import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div id="wrapper-content"
           itemScope itemType="http://schema.org/Organization">
        <div id="welcome" className="container">
          <div className="title">
            <h2>
              <span itemProp="name">Data scraping from APIs and Web Sites</span>
            </h2>
            <span className="byline" itemProp="description">
              api data aggregation, price comparsion, data analysis
            </span>
          </div>

          <div className="content">
            <p>
              <strong>Web scraping</strong> also refered as "web harvesting" or
              "web data extraction" is a technique to extract valuable
              information from different sources in structured format for
              the further analysis.

              We're using most modern technologies to archieve this goals.
            </p>

            <a href="mailto:alex@imscraping.ninja" className="button"
               onclick="ga('send', 'event', 'Email', 'Click', '', 1)">
              Contact Us<br />
              <span itemProp="email">alex@imscraping.ninja</span>
            </a>
          </div>

        </div>
      </div>
    );
  }
}

export default Home;
