'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
var webserver = require('gulp-webserver');

requireDir('./tasks');
var siteConfig = require('./site.config.js');
var log = require('./utils/createLogger.js')(siteConfig.env);

// linters
gulp.task('js:check', ['jshint', 'jscs']);
gulp.task('less:check', ['recess']);
gulp.task('html:check', ['html5lint']);

// build website and content
gulp.task('build', ['less', 'vendors-js', 'app-js', 'copy-root']); // 'copy-views',
gulp.task('content', [
  'projects:list', 'projects:details',
  'posts:details', 'posts:list',
]);

gulp.task('watch', function() {
  gulp.watch(['./src/styles/*.less'], ['less']);
  gulp.watch(['./src/app/*.js', './src/app/**/*.js'], ['app-js']);
  gulp.watch(['./src/*.html'], ['copy-root']);
  gulp.watch(['./src/views/*.html'], ['app-js']);

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
