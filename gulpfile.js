const gulp = require('gulp')
const gutil = require('gulp-util')
const webpackStream = require('webpack-stream')
const named = require('vinyl-named')
const pug = require('gulp-pug')
const watch = require('gulp-watch')
const sass = require('gulp-sass')
const connect = require('gulp-connect');
const connectRewrite = require('http-rewrite-middleware')
const debounce = require('gulp-debounce');
const uglify = require('gulp-uglify')
const open = require('gulp-open')
const del = require('del')
const notify = require('gulp-notify')
const ghPages = require('gulp-gh-pages')
const changed = require('gulp-changed')
const runSequence = require('run-sequence')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const webpack = require('webpack')
const imagemin = require('gulp-imagemin')
const imageminJpegRecompress = require('imagemin-jpeg-recompress')
const inlinesource = require('gulp-inline-source')
const StringReplacePlugin = require("string-replace-webpack-plugin")

const MISC_FILES = ['./code/CNAME', './code/**/*.mp4', './code/**/*.ogv', './code/**/*.webm', './code/**/*.eot', './code/**/*.ttf', './code/**/*.woff', './code/**/*.woff2']
const PUG_FILES = ['./code/**/*.pug', './code/**/*.jade']
const SASS_FILES = ['./code/**/*.scss']
const SASS_INCLUDE_PATHS = ['node_modules/susy/sass']
const FAVICON_BASE = ['./code/favicons']
const FAVICON_FILES = [(FAVICON_BASE + '/**/*')]
const IMAGE_FILES = ['./code/**/*.png','./code/**/*.jpg','./code/**/*.gif','./code/**/*.jpeg', './code/**/*.svg', '!./code/images/favicons/**/*']
const WEBPACKABLE_FILES = ['./code/scripts/service-worker.js', './code/scripts/development.js']
const BUILD_SRC = './code/'
const BUILD_DEST = './dist/'
const BUILT_FILES = BUILD_DEST + '**/*'
const BUILD_HTML = './dist/**/*.html'

const webpackConfig = {
  output: {
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        text: /\.js$/,
        exclude: /node_modules/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
                pattern: /SERVICE_WORKER_VERSION/ig,
                replacement: function (match, p1, offset, string) {
                    return '' + Date.now();
                }
            }
          ]
        })
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    stats: {
      colors: true,
      chunks: false
    }
  },
  plugins: [
    new StringReplacePlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  stats: {
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: true,
    chunkModules: false,
    modules: false,
    children: false,
    cached: false,
    reasons: false,
    source: false,
    chunkOrigins: false
  }
}

const logError = function(error) {
  var errorString = error.toString()
  notify.onError({
    title: 'Build Error',
    message: errorString
  })(error)
  console.log(errorString)
  this.emit('end')
}

// ---------------------------------
// --------- BUILD TASKS -----------
// ---------------------------------
gulp.task('clean', (callback) => {
  return del(BUILT_FILES, callback)
})

gulp.task('favicons', () => {
  return gulp.src(FAVICON_FILES, {cwd: FAVICON_BASE})
    .pipe(gulp.dest(BUILD_DEST))
    .on('error', logError)
})

gulp.task('misc', () => {
  return gulp.src(MISC_FILES)
    .pipe(changed(BUILD_DEST))
    .pipe(gulp.dest(BUILD_DEST))
    .on('error', logError)
})

gulp.task('templates', () => {
  const inlineOptions = {
    compress: false,
    rootpath: './dist/'
  };

  return gulp.src(PUG_FILES)
    .pipe(pug({
      pretty: false
    }))
    .on('error', logError)
    .pipe(inlinesource(inlineOptions))
    .on('error', logError)
    .pipe(gulp.dest(BUILD_DEST))
})

gulp.task('styles', () => {
  return gulp.src(SASS_FILES)
    .pipe(sass({ includePaths: SASS_INCLUDE_PATHS }))
    .on('error', logError)
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'IE 9']
    }))
    .on('error', logError)
    .pipe(cssmin())
    .on('error', logError)
    .pipe(gulp.dest(BUILD_DEST))
})

gulp.task('images', () => {
  return gulp.src(IMAGE_FILES)
    .pipe(changed(BUILD_DEST))
    .pipe(imagemin([
      imageminJpegRecompress({
        accurate: true,
        quality: 'veryhigh',
        target: 0.998
      })
    ]))
    .on('error', logError)
    .pipe(gulp.dest(BUILD_DEST))
})

gulp.task("app_scripts", () => {
  return gulp.src(WEBPACKABLE_FILES)
    .pipe(named())
    .pipe(webpackStream(webpackConfig))
    .on('error', logError)
    .pipe(gulp.dest(BUILD_DEST))
})

gulp.task('reload', () => {
  return gulp.src(BUILT_FILES)
    .pipe(debounce({ wait: 1000 })) // Avoids double/triple page reloads
    .pipe(connect.reload())
})

// ---------------------------------
// --------- WATCH TASKS -----------
// ---------------------------------
gulp.task('watch', () => {
  watch(FAVICON_FILES, () => gulp.start('favicons'))
  watch(MISC_FILES, () => gulp.start('misc'))
  watch(SASS_FILES, () => gulp.start('styles'))
  watch(IMAGE_FILES, () => gulp.start('images'))
  watch(PUG_FILES, () => gulp.start('templates'))

  webpackConfig.watch = true
  gulp.src(WEBPACKABLE_FILES)
    .pipe(named())
    .pipe(webpackStream(webpackConfig))
    .on('error', logError)
    .pipe(gulp.dest(BUILD_DEST))

  watch(BUILT_FILES, () => gulp.start('reload'))
})

// ----------------------------------
// --------- SERVER TASKS -----------
// ----------------------------------
gulp.task('server', () => {
  const middleware = connectRewrite.getMiddleware([
    {from: '^([^.]+[^/])$', to: '$1.html'}
  ])

  connect.server({
    root: 'dist',
    livereload: true,
    middleware: (connect, options) => {
      return [middleware]
    }
  })

  return gulp.src('./dist/index.html')
    .pipe(open('', {
      url: 'http://localhost:8080',
      app: 'google chrome'
    }))
})

// ----------------------------------
// --------- DEPLOY TASKS -----------
// ----------------------------------
gulp.task('push', () => {
  return gulp.src(BUILT_FILES)
    .pipe(ghPages({
      remoteUrl: 'git@github.com:leafagency/leafagency.github.io.git',
      force: true,
      branch: 'master'
    }))
    .on('error', logError)
})
// ----------------------------------
// --------- COMPOSITE TASKS --------
// ----------------------------------
gulp.task('build', (cb) => {
  return runSequence('clean', 'styles', ['misc', 'favicons', 'templates', 'images', 'app_scripts'], cb)
})
gulp.task('start', (cb) => {
  return runSequence('clean', 'styles', ['misc', 'favicons', 'templates', 'images'], 'watch', 'server', cb)
})
gulp.task('deploy', (cb) => {
  return runSequence('clean', 'styles', ['misc', 'favicons', 'templates', 'images', 'app_scripts'], 'push', cb)
})
