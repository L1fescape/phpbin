'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var lazypipe = require('lazypipe');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var notify = require('gulp-notify');

// Utils
// =======================================

function handleErrors(){
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}


// Tasks
// =======================================

gulp.task('browserify', function() {
  return browserify('./app/js/main.js')
    .bundle()
    .on('error', handleErrors)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('htdocs', function() {
  return gulp.src('app/htdocs/**')
    .on('error', handleErrors)
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function() {
  return gulp.src('app/css/**')
    .on('error', handleErrors)
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['htdocs', 'css', 'browserify']);
gulp.task('default', ['build']);
