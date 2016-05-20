//gulp file influenced by: http://webdesign.tutsplus.com/tutorials/combining-pattern-lab-with-gulp-for-improved-workflow--cms-22187

var gulp = require('gulp');
var bless = require('gulp-bless');
var mqRemove = require("gulp-mq-remove");
var compass = require('gulp-compass');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var clean = require('gulp-clean');
var todo = require('gulp-todo');
var fs = require('fs');
var path = require('path');
var template = require('lodash.template');
var through = require('through2');
var directoryMap = require("gulp-directory-map");
var bump = require("gulp-bump");
var config = require('./gulp.config.json');
var shell = require('gulp-shell');


// Description: Removing compiled files before running other tasks, this helps keep deleted source files from sticking around
gulp.task('clean:before', function () {
  return gulp.src([config.images.dest, config.fonts.dest, config.jsheader.dest, config.jsfooter.dest, config.scss.dest, config.placeholders.dest])
    .pipe(clean({
      force: true
    }))
});

//concatenate and minify headerjs files
gulp.task('jsheader', function() {
    return gulp.src(config.jsheader.src)
        .pipe(concat('header.dev.js'))
        .pipe(gulp.dest(config.jsheader.dest))
        .pipe(rename('header.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.jsheader.dest))
        .pipe(browserSync.reload({stream:true}));
});

// Concatenate & Minify Footer JS files
gulp.task('jsfooter', function() {
    return gulp.src(config.jsfooter.src)
        .pipe(concat('footer.dev.js'))
        .pipe(gulp.dest(config.jsfooter.dest))
        .pipe(rename('footer.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.jsfooter.dest))
        .pipe(browserSync.reload({stream:true}));
});

//copy fonts to wwwroot
gulp.task('fonts', function() {
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest))
        .pipe(browserSync.reload({stream:true}));

});

//copy images to wwwroot
gulp.task('images', function() {
    return gulp.src(config.images.src)
        .pipe(gulp.dest(config.images.dest))
        .pipe(browserSync.reload({stream:true}));
});

//copy placeholder assets to wwwroot
gulp.task('placeholders', function() {
    return gulp.src(config.placeholders.src)
        .pipe(gulp.dest(config.placeholders.dest))
        .pipe(browserSync.reload({stream:true}));
});

//generate styleguide specific overrides
gulp.task('sg_scss', function() {
    gulp.src(config.sg_scss.src)
        .pipe(sass({
            css: config.sg_scss.dest,
            sass: 'scss',
            fonts: 'fonts',
            debug: true,
            style: 'expanded',
            comments: true,
            sourceComments: true,
            sourcemap: false
        })).on('error', gutil.log)
        .pipe(gulp.dest(config.sg_scss.dest))
        .pipe(browserSync.reload({stream:true}));
});

//generate style.css and minified/blessed variants
gulp.task('scss', function() {
    gulp.src(config.scss.files)
        .pipe(sass({
            css: config.scss.dest,
            sass: 'scss',
            fonts: 'fonts',
            debug: true,
            style: 'expanded',
            comments: true,
            sourceComments: true,
            sourcemap: false
        })).on('error', gutil.log)
        .pipe(browserSync.reload({stream:true}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(config.scss.dest))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(config.scss.dest))
        .pipe(rename({
            suffix: '.blessed.ie89'
        }))
        .pipe(bless())
        .pipe(gulp.dest(config.scss.dest))
        .pipe(mqRemove({ width: "1280px" }))
        .pipe(rename({
            suffix: '.blessed.ie7'
        }))
        .pipe(bless())
        .pipe(gulp.dest(config.scss.dest))
        .pipe(browserSync.reload({stream:true}));
});


//copy the styleguide folder from core to public
gulp.task('styleguide', function() {
  return gulp.src(config.patternlab.styleguide.src)
    .pipe(gulp.dest(config.patternlab.styleguide.dest));

});


gulp.task('patternlab', function () {
  return gulp.src('', {read: false})
    .pipe(shell([
      'php core/builder.php -gpn'
    ]))
    .pipe(browserSync.reload({stream:true}));
});

// task: BrowserSync
// Description: Run BrowserSync server with disabled ghost mode
gulp.task('browser-sync', function() {
  browserSync({
    server: {
        baseDir: config.wwwroot
    },
    host: 'unity-lab.localhost.stonybrook.edu',
    port: 3000,
    ghostMode: true,
    open: "external"
  });
});




// Task: Default
// Description: Build all stuff of the project once
gulp.task('default', ['clean:before'], function () {
  //production = false;

  gulp.start(
    'patternlab',
    //'styleguide',
    'fonts',
    'placeholders',
    'images',

    'scss',
    'sg_scss',

    'jsheader',
    'jsfooter'
  );
});

// Task: Start your production-process
// Description: Typ 'gulp' in the terminal
gulp.task('serve', function () {
 // production = false;

  gulp.start(
    'browser-sync',
    'default',
    'watch'
  );
});

// Task: Watch files
gulp.task('watch', function () {

  // Watch Pattern Lab files
  gulp.watch(
    config.patternlab.src,
    ['patternlab']
  );

  // Watch scripts
  gulp.watch(
    config.jsheader.src,
    ['jsheader']
  );

  gulp.watch(
    config.jsfooter.src,
    ['jsfooter']
  );

  // Watch images
  gulp.watch(
    config.images.src,
    ['images']
  );

  gulp.watch(
    config.placeholders.src,
    ['placeholders']
  );

  // Watch Sass
  gulp.watch(
    config.scss.src,
    ['scss']
  );

  // Watch Sass
  gulp.watch(
    config.sg_scss.src,
    ['sg_scss']
  );

  // Watch fonts
  gulp.watch(
    config.fonts.src,
    ['fonts']
  );
});
