var gulp = require('gulp');
var jade = require('gulp-jade');
var watch = require('gulp-watch');

var JADE_FILES = './code/*/*.jade';

gulp.task('templates', function() {
  gulp.src(JADE_FILES)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
    gulp.watch(JADE_FILES, function() {
      gulp.run('templates');
    });
});