var gulp = require('gulp');
var jade = require('gulp-jade');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var open = require('gulp-open');
var imageOptimization = require('gulp-image-optimization');

var JADE_FILES = './code/**/*.jade';
var SASS_FILES = './code/**/*.scss';
var IMAGE_FILES = ['./code/**/*.png','./code/**/*.jpg','./code/**/*.gif','./code/**/*.jpeg'];
var APP_JS_FILES = './code/scripts/app/**/*.js';
var LIB_JS_FILES = './code/scripts/lib/**/*.js';
var BROWSERIFY_ROOT = './code/scripts/app/main.js';
var BUILD_DEST = './dist/';

function logError (error) {
  console.log(error.toString());
  this.emit('end');
}

// ---------------------------------
// --------- WATCH TASKS -----------
// ---------------------------------
gulp.task('templates', function() {
  gulp.src(JADE_FILES)
    .pipe(jade({
      pretty: true
    }))
    .on('error', logError)
    .pipe(gulp.dest(BUILD_DEST))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  gulp.src(SASS_FILES)
    .pipe(sass())
    .on('error', logError)
    .pipe(gulp.dest(BUILD_DEST))
    .pipe(connect.reload());
});

gulp.task('images', function() {
    gulp.src(IMAGE_FILES)
      .pipe(imageOptimization({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
      }))
      .on('error', logError)
      .pipe(gulp.dest(BUILD_DEST));
});

gulp.task('app_scripts', function() {
  gulp.src(BROWSERIFY_ROOT)
    .pipe(browserify({
      glboal: true,
      debug : true
    }))
    .on('error', logError)
    .pipe(gulp.dest(BUILD_DEST+'scripts/app/'));
});

gulp.task('lib_scripts', function() {
  gulp.src(LIB_JS_FILES)
    .pipe(uglify())
    .on('error', logError)
    .pipe(gulp.dest(BUILD_DEST+'scripts/lib/'));
});

gulp.task('watch', function () {
  gulp.watch(JADE_FILES, function() {
    gulp.run('templates');
  });

  gulp.watch(SASS_FILES, function() {
    gulp.run('styles');
  });

  gulp.watch(IMAGE_FILES, function() {
    gulp.run('images');
  });

  gulp.watch(APP_JS_FILES, function() {
    gulp.run('app_scripts');
  });

  gulp.watch(LIB_JS_FILES, function() {
    gulp.run('lib_scripts');
  });
});

// ----------------------------------
// --------- SERVER TASKS -----------
// ----------------------------------
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('open', function(){
  gulp.src('./dist/index.html')
  .pipe(open('', {
    url: 'http://localhost:8080',
  }));
});

// ----------------------------------
// --------- COMPOSITE TASKS --------
// ----------------------------------
gulp.task('build', ['templates', 'styles', 'images', 'app_scripts', 'lib_scripts']);
gulp.task('start', ['build', 'connect', 'watch', 'open']);
