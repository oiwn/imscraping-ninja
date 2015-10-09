'use strict';

var gulp = require('gulp');
var path = require('path');
var merge = require('merge-stream');
var concat = require('gulp-concat-util');
var through = require('through2');
var marked = require('gulp-marked');
var rename = require('gulp-rename');
var frontMatter = require('gulp-front-matter');

var siteConfig = require('./../site.config.js');
var log = require('./../utils/createLogger.js')(siteConfig.env);
require('./clean.js');

var siteConfig = require('./../site.config.js');
require('./clean.js');

/*
gulp.task('projects:list', ['clean:projects'], function() {
  var projectsList =
    gulp
      .src(siteConfig.content.projects)
      .pipe(frontMatter({
        property: 'postMeta',
        remove: true,
      }))
      .pipe(through.obj(function(file, enc, cb) {
        file.contents = new Buffer(
          '\t' + JSON.stringify(file.postMeta));
        return cb(null, file);
      }))
      .pipe(concat('projects-list.json', {sep: ',\n'}))
      .pipe(concat.header('[\n')).pipe(concat.footer('\n]'))
      .pipe(gulp.dest('build/content'));
  return projectsList;
});
*/

gulp.task('projects:list', ['clean:projects'], function() {
  var postsList =
    gulp
      .src(siteConfig.content.projects)
      .pipe(frontMatter({
        property: 'postMeta',
        remove: true,
      }))
      .pipe(through.obj(function(file, enc, cb) {
        file.postMeta.filename = path.basename(file.path, '.md');
        file.contents = new Buffer(
          JSON.stringify(file.postMeta, null, 2));
        return cb(null, file);
      }))
      .pipe(concat('projects-list.json', {sep: ',\n'}))
      .pipe(concat.header('[\n')).pipe(concat.footer('\n]'))
      .pipe(gulp.dest('build/content'));
  return postsList;
});

gulp.task('projects:details', function() {
  var posts =
    gulp
      .src(siteConfig.content.projects)
      .pipe(frontMatter({
        property: 'postMeta',
        remove: true,
      }))
      .pipe(marked())
      .pipe(through.obj(function(file, enc, cb) {
        log.info('Project details:', file.postMeta.title);
        file.contents = new Buffer(
          JSON.stringify({
            meta: file.postMeta,
            content: file.contents.toString(),
          }, null, 2));
        return cb(null, file);
      }))
      .pipe(rename({extname: '.json'}))
      .pipe(gulp.dest('build/content/projects'));
  return posts;
});
