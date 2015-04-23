'use strict';

var path = require('path');

var del = require('del');
var gulp = require('gulp');
var chalk = require('chalk');
var requireDir = require('require-dir');
var webserver = require('gulp-webserver');
requireDir('./tasks');

var siteConfig = require('./site.config.js');
var log = require('./utils/createLogger.js')(siteConfig.env);

gulp.task('clean:finished', ['clean'], function() {
  log.debug('Working directory cleaned!');
});

gulp.task('build', ['less', 'vendors-js', 'app-js', 'copy-views', 'copy-root']);

gulp.task('watch', function() {
  // gulp.watch(['./src/styles/*.less'], ['less']);
  // gulp.watch(['./src/app/*.js'], ['app-js']);
  // gulp.watch(['./src/*.html'], ['copy-root']);
  gulp.watch(['./src/views/*.html'], ['copy-views']);
});

gulp.task('serve', ['build', 'watch'], function() {
  gulp.src('./build')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: false
    }));
});

gulp.task('default', ['serve'], function() {
  log.info('Website rendered...');
});
