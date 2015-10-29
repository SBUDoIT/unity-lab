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

gulp.task('cleantemp', function() {
    return gulp.src('.temp', {
            read: false
        })
        .pipe(clean({
            force: true
        }));
});

gulp.task('cleandist', function() {
    return gulp.src('.dist', {
            read: false
        })
        .pipe(clean({
            force: true
        }));
});

// Concatenate & Minify JS
gulp.task('headerjs', function() {
    return gulp.src(['source/javascripts/header/libraries/*.js', 'soure/javascripts/header/custom/*.js'])
        .pipe(concat('header.dev.js'))
        .pipe(gulp.dest('source/js/header'))
});

// Concatenate & Minify JS
gulp.task('footerjs', function() {
    return gulp.src(['source/javascripts/footer/libraries/*.js', 'source/javascripts/footer/custom/*.js'])
        .pipe(concat('footer.dev.js'))
        .pipe(gulp.dest('source/js/footer'))
});


gulp.task('textures-json', function() {

    gulp.src(['images/backgrounds/textures/*.jpg', 'images/backgrounds/textures/*.png'])
        .pipe(directoryMap({
            filename: 'textures.json'
        }))
        .pipe(gulp.dest('styleguide/compiled-assets'));

});

gulp.task('patterns-json', function() {

    gulp.src(['images/backgrounds/patterns/**/*.jpg', 'images/backgrounds/patterns/**/*.png'])
        .pipe(directoryMap({
            filename: 'patterns.json'
        }))
        .pipe(gulp.dest('styleguide/compiled-assets'));

});

gulp.task('styles', function() {
    gulp.src('source/scss/*.scss')
        .pipe(sass({
            sass: 'scss',
            fonts: 'fonts',
            debug: true,
            style: 'expanded',
            comments: true,
            sourceComments: true,
            sourcemap: false
        })).on('error', gutil.log)
        //  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('source/css'))
        //.pipe(gulp.dest('app/assets/temp'))

    .pipe(notify({
        message: 'Styles task complete'
    }));


});


gulp.task('watch', function() {
    gulp.watch('source/javascripts/header/**/*.js', ['headerjs']);
    gulp.watch('source/javascripts/footer/**/*.js', ['footerjs']);
    gulp.watch('source/scss/**/*.scss', ['styles']);
});


gulp.task('default', ['styles', 'headerjs', 'footerjs', 'watch']);
