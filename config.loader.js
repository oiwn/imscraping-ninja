/* eslint-env: node */
/* global module require */
var globPages = require('./utils/glob-pages');
var config = require('./website.config');

var cache;
module.exports = function() {
  const value = {};
  value.config = config;
  if (!cache) {
    cache = globPages('articles');
  }
  value.pages = cache;
  return JSON.stringify(value);
};
