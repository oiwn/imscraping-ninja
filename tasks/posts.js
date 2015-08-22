'use strict';

var gulp = require('gulp');
var path = require('path');
var concat = require('gulp-concat-util');
var through = require('through2');
var marked = require('gulp-marked');
var rename = require('gulp-rename');
var merge = require('merge-stream');
var frontMatter = require('gulp-front-matter');

var siteConfig = require('./../site.config.js');
require('./clean.js');

var log = require('./../utils/createLogger.js')(siteConfig.env);


gulp.task('posts:render', ['clean:posts'], function() {
  var posts =
    gulp
      .src(siteConfig.content.blog)
      .pipe(frontMatter(
        {
          property: 'postMeta',
          remove: true,
        }
      ))
      .pipe(through.obj(function(file, enc, cb) {
        file.postMeta.filename = path.basename(file.path, '.md');
        file.mdContent = file.contents;
        console.log('Process post: ', file.postMeta.title);
        this.push(file);
        cb();
      }));

  var postsList = posts
    .pipe(through.obj(function(file, enc, cb) {
      file.contents = new Buffer(
        '\t' + JSON.stringify(file.postMeta)
      );
      return cb(null, file);
    }))
    .pipe(concat('posts-list.json', {sep: ',\n'}))
    .pipe(concat.header('[\n')).pipe(concat.footer('\n]'))
    .pipe(gulp.dest('build/content'));

  var postDetails = posts
    .pipe(through.obj(function(file, enc, cb) {
      file.conents = file.mdContent.toString();
      return cb(null, file);
    }))
    .pipe(marked())
    .pipe(through.obj(function(file, enc, cb) {
      file.contents = new Buffer(
        JSON.stringify({
          title: file.postMeta.title,
          description: file.postMeta.description,
          filename: file.postMeta.filename,
          content: file.mdContent.toString(),
        }, null, 2));
      return cb(null, file);
    }))
    .pipe(rename({extname: '.json'}))
    .pipe(gulp.dest('build/content/posts'));

  return merge(postDetails, postsList);
});


gulp.task('posts:list', ['clean:posts'], function() {
  var postsList =
    gulp
      .src(siteConfig.content.blog)
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
      .pipe(concat('posts-list.json', {sep: ',\n'}))
      .pipe(concat.header('[\n')).pipe(concat.footer('\n]'))
      .pipe(gulp.dest('build/content'));
  return postsList;
});

gulp.task('posts:details', ['clean:posts'], function() {
  var posts =
    gulp
      .src(siteConfig.content.blog)
      .pipe(frontMatter({
        property: 'postMeta',
        remove: true,
      }))
      .pipe(marked(
        {
          highlight: function(code) {
            return require('highlight.js').highlightAuto(code).value;
          },
        }
      ))
      .pipe(through.obj(function(file, enc, cb) {
        file.contents = new Buffer(
          JSON.stringify({
            meta: file.postMeta,
            content: file.contents.toString(),
          }, null, 2));
        return cb(null, file);
      }))
      .pipe(rename({extname: '.json'}))
      .pipe(gulp.dest('build/content/posts'));
  return posts;
});
