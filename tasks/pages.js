'use strict';

var gulp = require('gulp');

// var siteConfig = require('./../site.config.js');

//var applyContext = function() {};

gulp.task('pages:build', function() {
  //.pipe(applyContext({property: 'page', remove: true}))
  //.pipe(applyTemplate('design/page.html'))
  //.pipe(rename({extname: '.html'}))

  return gulp
    .src('views/*.html')
    .pipe(gulp.dest('build'));
});
