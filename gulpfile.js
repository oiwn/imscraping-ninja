'use strict';

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var webserver = require('gulp-webserver');


gulp.task('deploy', function() {
  return gulp.src(['./src/**/*', './src/*'])
             .pipe(ghPages());
});


gulp.task('webserver', function() {
  gulp.src('./src')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: false
    }));
});
