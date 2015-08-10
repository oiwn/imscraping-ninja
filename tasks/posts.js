'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat-util');
var through = require('through2');
var frontMatter = require('gulp-front-matter');

var siteConfig = require('./../site.config.js');


gulp.task('posts:list', function() {
  var postsList =
    gulp
      .src(siteConfig.content.blog)
      .pipe(frontMatter({
        property: 'postMeta',
        remove: true,
      }))
      .pipe(through.obj(function(file, enc, cb) {
        file.contents = new Buffer(
          '\t' + JSON.stringify(file.postMeta));
        return cb(null, file);
      }))
      .pipe(concat('posts-list.json', {sep: ',\n'}))
      .pipe(concat.header('[\n')).pipe(concat.footer('\n]'))
      .pipe(gulp.dest('build/content'));
  return postsList;
});
