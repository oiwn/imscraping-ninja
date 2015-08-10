'use strict';

var path = require('path');

var del = require('del');
var gulp = require('gulp');
var chalk = require('chalk');
var siteConfig = require('./../site.config.js');
var log = require('./../utils/createLogger.js')(siteConfig.env);

gulp.task('clean:app:css', function(callback) {
  var appCssPath = path.join(
    siteConfig.assetsDest,
    siteConfig.assets.appCSSDest
  );
  log.debug('Cleaning app css...', chalk.bgBlue(appCssPath));
  del([appCssPath], callback);
});

gulp.task('clean:app:js', function(callback) {
  var appJsPath = path.join(
    siteConfig.assetsDest,
    siteConfig.assets.appJSDest
  );
  log.debug('Cleaning app js...', chalk.bgBlue(appJsPath));
  del([appJsPath], callback);
});

gulp.task('clean:vendors:js', function(callback) {
  var vendorsJsPath = path.join(
    siteConfig.assetsDest,
    siteConfig.assets.vendorsJSDest
  );
  log.debug('Cleaning vendors js...', chalk.bgBlue(vendorsJsPath));
  del([vendorsJsPath], callback);
});

gulp.task('clean:views', function(callback) {
  var viewsPath = path.join(
    siteConfig.buildDir,
    'views'
  );
  log.debug('Cleaning views...', chalk.bgBlue(viewsPath));
  del([viewsPath], callback);
});

gulp.task('clean:root', function(callback) {
  var rootPath = siteConfig.buildDir + '/*.*';
  log.debug('Cleaning app root files (index.html, sitemap, robots etc)...', chalk.bgBlue(rootPath));
  del([rootPath], callback);
});
