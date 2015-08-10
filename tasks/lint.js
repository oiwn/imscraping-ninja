'use strict';
var gulp = require('gulp');

var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var stylish = require('gulp-jscs-stylish');
var recess = require('gulp-recess');
var html5Lint = require('gulp-html5-lint');

var siteConfig = require('./../site.config.js');

var jsToLint = siteConfig.assets.appJS.concat(
  [
    'gulpfile.js',
    'tasks/*.js',
    'utils/*.js',
  ]
);

var lessToLint = ['src/styles/main.less'];

gulp.task('jshint', function() {
  return gulp
    .src(jsToLint)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function() {
  return gulp
    .src(jsToLint)
    .pipe(jscs())
    .on('error', function() {})
    .pipe(stylish());
});

gulp.task('recess', function() {
  return gulp
    .src(lessToLint)
    .pipe(recess())
    .pipe(recess.reporter())
    .pipe(gulp.dest('dist'));
});

gulp.task('html5lint', function() {
  // TODO: It doesn't work.
  return gulp
    .src(['./src/*.html', './src/views/*.html'])
    .pipe(html5Lint());
});
