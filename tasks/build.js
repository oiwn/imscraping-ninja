'use strict';

var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var expect = require('gulp-expect-file');
var sourcemaps = require('gulp-sourcemaps');

var siteConfig = require('./../site.config.js');

gulp.task('clean', function(callback) {
  del([
    'build/*.*',
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'build/assets/*.*',
    'build/images'
    ], callback);
});


gulp.task('copy', function() {
    return gulp
      .src(siteConfig.siteStruct)
      .pipe(gulp.dest(siteConfig.buildDir));
});

gulp.task('less', function() {
  return gulp
    .src(siteConfig.appLESS)
    .pipe(expect(siteConfig.appLESS))
    .pipe(sourcemaps.init())
    .pipe(less({compress: true}))
    .pipe(concat('app.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(siteConfig.assetsDest));
});
