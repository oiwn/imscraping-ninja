'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
var webserver = require('gulp-webserver');

requireDir('./tasks');

gulp.task('build', ['clean', 'less', 'copy']);

gulp.task('watch', function() {
  gulp.watch('./src/styles/*.less', ['less']);
});

gulp.task('serve', ['build', 'watch'], function() {
  gulp.src('./build')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: false
    }));
});
