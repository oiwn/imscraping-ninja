/* @flow weak */
import { linkPrefix } from '../website.config.js';
import invariant from 'invariant';
import isString from 'lodash/isString';

// Function to add prefix to links.
const prefixLink = (_link) => {
  if (
    (typeof __PREFIX_LINKS__ !== 'undefined' && __PREFIX_LINKS__ !== null)
      && __PREFIX_LINKS__ && (linkPrefix !== null)) {
    const invariantMessage = `
    You're trying to build your site with links prefixed
    but you haven't set 'linkPrefix' in your website.settings.
    `;
    invariant(isString(linkPrefix), invariantMessage);

    return config.linkPrefix + _link;
  } else {
    return _link;
  }
}

module.exports = {
  prefixLink,
}
