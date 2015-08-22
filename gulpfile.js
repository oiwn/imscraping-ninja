'use strict';

var gulp = require('gulp');

var requireDir = require('require-dir');
var webserver = require('gulp-webserver');
requireDir('./tasks');

var siteConfig = require('./site.config.js');
var log = require('./utils/createLogger.js')(siteConfig.env);

// linters
gulp.task('jslint', ['jshint', 'jscs']);
gulp.task('lesslint', ['recess']);
gulp.task('htmllint', ['html5lint']);

// build website and content
gulp.task('build', ['less', 'vendors-js', 'app-js', 'copy-views', 'copy-root']);
gulp.task('content', ['projects:list', 'posts:details', 'posts:list']);

gulp.task('watch', function() {
  gulp.watch(['./src/styles/*.less'], ['less']);
  gulp.watch(['./src/app/*.js', './src/app/**/*.js'], ['app-js']);
  gulp.watch(['./src/*.html'], ['copy-root']);
  gulp.watch(['./src/views/*.html'], ['copy-views']);

  // content
  gulp.watch(['./content/**/*.md'], ['content']);
});

gulp.task('serve', ['build', 'content', 'watch'], function() {
  gulp.src('./build')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      fallback: 'index.html',
      open: false,
    }));
});

gulp.task('render', ['build', 'content']);

gulp.task('default', ['serve'], function() {
  log.info('Website rendered...');
});
