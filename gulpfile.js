'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

// Run all the test code.
gulp.task('test', function() {
gulp.src('./tests/*.js', {read: false})
  .pipe(mocha({
    reporter: 'spec'
  }))});

// Default task should always be run before committing.
gulp.task('default', ['test']);
