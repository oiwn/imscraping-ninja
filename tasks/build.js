'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var expect = require('gulp-expect-file');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');

var siteConfig = require('./../site.config.js');
require('./clean.js');

gulp.task('copy-views', ['clean:views'], function() {
  gulp
    .src('./src/views/*.html')
    .pipe(gulp.dest(siteConfig.buildDir + '/views'));
});

gulp.task('copy-root', ['clean:root'], function() {
  gulp
    .src(['./src/*.html', './src/*.txt', './src/favicon.ico', './src/sitemap.xml'])
    .pipe(gulp.dest(siteConfig.buildDir));
});

gulp.task('less', ['clean:app:css'], function() {
  return gulp
    .src(siteConfig.assets.appLESS)
    .pipe(expect(siteConfig.assets.appLESS))
    .pipe(sourcemaps.init())
    .pipe(less({compress: true}))
    .pipe(concat(siteConfig.assets.appCSSDest))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(siteConfig.assetsDest));
});

gulp.task('vendors-js', ['clean:vendors:js'], function() {
  return gulp
    .src(siteConfig.assets.vendorsJS)
    .pipe(expect(siteConfig.assets.vendorsJS))
    .pipe(ngAnnotate())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat(siteConfig.assets.vendorsJSDest))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(siteConfig.assetsDest));
});

gulp.task('app-js', ['clean:app:js'], function() {
  return gulp
    .src(siteConfig.assets.appJS)
    .pipe(ngAnnotate())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat(siteConfig.assets.appJSDest))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(siteConfig.assetsDest));
});
