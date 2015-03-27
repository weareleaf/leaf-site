var gulp = require('gulp');
var jade = require('gulp-jade');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

var JADE_FILES = './code/**/*.jade';
var SASS_FILES = './code/**/*.scss';

var BUILD_DEST = './dist/';

gulp.task('templates', function() {
  gulp.src(JADE_FILES)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(BUILD_DEST))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  gulp.src(SASS_FILES)
    .pipe(sass())
    .pipe(gulp.dest(BUILD_DEST))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(JADE_FILES, function() {
    gulp.run('templates');
  });

  gulp.watch(SASS_FILES, function() {
    gulp.run('styles');
  });
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('run', ['connect', 'watch']);
