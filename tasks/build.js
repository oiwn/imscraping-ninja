'use strict';

var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var expect = require('gulp-expect-file');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');

var siteConfig = require('./../site.config.js');

gulp.task('clean', function(callback) {
  del([
    'build/*.*',
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'build/assets/*.*',
    'build/views'
    ], callback);
});


gulp.task('copy', function() {
    gulp
      .src(siteConfig.siteStruct)
      .pipe(gulp.dest(siteConfig.buildDir));
    gulp
      .src('src/views/*.*')
      .pipe(gulp.dest(siteConfig.buildDir + '/views'));
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

gulp.task('vendors-js', function() {
  return gulp
    .src(siteConfig.vendorsJS)
    .pipe(expect(siteConfig.vendorsJS))
    .pipe(ngAnnotate())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('vendors.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(siteConfig.assetsDest));
});

gulp.task('app-js', function() {
  return gulp
    .src(siteConfig.appJS)
    .pipe(ngAnnotate())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(siteConfig.assetsDest));
});
