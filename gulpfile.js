'use strict';
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var notify = require('gulp-notify');
 
var scriptsDir = './app/js';
var buildDir = './dist';
 
function buildScript(file, watch) {
  var props = watchify.args;
  props.entries = [scriptsDir + '/' + file];
  props.debug = true;

  if (process.env.NODE_ENV === 'production'){
    props.debug = false;
  }
  
  var bundler = watch ? watchify(browserify(props)) : browserify(props);
  
  bundler.transform(reactify);
  if (process.env.NODE_ENV === 'production'){
    bundler.transform({
        global: true
    }, 'uglifyify');
  }

  function rebundle() {
    var stream = bundler.bundle();
    return stream.on('error', notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
      }))
      .pipe(source(file))
      .pipe(gulp.dest(buildDir + '/'));
  }
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });
  return rebundle();
}
 

gulp.task('htdocs', function() {
  return gulp.src('app/htdocs/**')
    .on('error', notify.onError({
      title: "Compile Error",
      message: "<%= error.message %>"
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function() {
  return gulp.src('app/css/**')
    .on('error', notify.onError({
      title: "Compile Error",
      message: "<%= error.message %>"
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['htdocs', 'css'], function() {
  return buildScript('app.js', false);
});

gulp.task('watch', ['htdocs', 'css'], function() {
  return buildScript('app.js', true);
});
