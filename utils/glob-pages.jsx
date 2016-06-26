/* @flow weak */
import glob from 'glob';

function buildPage(directory, page) {
  return { directory, page };
}

function globQuery(directory) {
  // Make this list easy to modify through the config?
  // Or just keep adding extensions...?
  const fileTypesToGlob = [
    'jsx',
    'md',
    'html',
  ];
  const fileGlobQuery = fileTypesToGlob.map((type) => `*.${type}`);
  const joinedFileQuery = fileGlobQuery.join('|');
  return `pages/${directory}/**/?(${joinedFileQuery})`;
}

let globCache;
function createCache(directory) {
  const pagesData = [];

  const pages = glob.sync(globQuery(directory), null);
  pages.forEach(page => {
    pagesData.push(buildPage(directory, page));
  });

  /* console.log(`globbed ${pagesData.length} pages`);*/
  globCache = pagesData;
  return globCache;
}

module.exports = function globPages(directory) {
  if (typeof globCache === 'undefined') {
    return createCache(directory);
  } else {
    return globCache;
  }
};
