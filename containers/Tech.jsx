import React from 'react';

class Tech extends React.Component {
  render() {
    return (
      <div id="wrapper-content">
        <div id="welcome" className="container">
          <div className="title">
            <h2>Technologies and Frameworks</h2>
            <span className="byline">
              tools and stuff used for web scraping
            </span>
          </div>

          <div className="content">
            <div className="content-container">

              <h3>Web Scraping and Web Automation</h3>
              <br />
              <ul>
                <li>
                  <b>Grab Framework</b> - web scraping framework for the
                  practical usage
                </li>
                <li><b>Scrapy</b> - slow, heavy but common solution</li>
                <li>
                  <b>Selenium</b> - for the web automation, testing
                  purposes and if JS execution is required
                </li>
                <li><b>PhantomJS</b> - headles browser based on Google V8</li>
              </ul>

              <br />

              <h3>Databases</h3>
              <br />
              <ul>
                <li>
                  <b>MongoDB</b> - working horse. Fit scraping requrements
                  just perfectly
                </li>
                <li><b>Redis</b> - caching, task queues</li>
                <li>
                  <b>MySQL</b>, <b>PostgreSQL</b> - rarely used for data
                  scraping, maily as a storage for data delivery
                </li>
              </ul>

              <br />

              <h3>Backend</h3>
              <br />
              <ul>
                <li>
                  <b>Flask</b> - lightwidth with solutions to quickly
                  prototype REST interface to the database
                </li>
                <li>
                  <b>Loopback</b> - javascript REST framework
                  based on expressjs
                </li>
                <li>
                  <b>Django</b> - general purpose, battaries included
                  python framework
                </li>
              </ul>

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Tech;
