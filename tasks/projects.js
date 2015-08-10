'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat-util');
var through = require('through2');
var frontMatter = require('gulp-front-matter');

var siteConfig = require('./../site.config.js');


gulp.task('projects:list', function() {
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
