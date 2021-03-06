/**
 * Created by Shuriken on 16.01.2016.
 */

var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del'),
    ngannotate = require('gulp-ng-annotate');

gulp.task('jshint', function() {
    return gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('default', ['clean'], function() {
   gulp.start('usemin', 'imagemin');
});

gulp.task('usemin', function() {
    return gulp.src('app/**/*.html')
        .pipe(usemin({
            css: [minifycss(), rev()],
            vendor_css: [minifycss(), rev()],
            js: [ngannotate(), uglify(), rev()],
            vendor_js: [ngannotate(), uglify(), rev()]
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('imagemin', ['imageDel'], function() {
        gulp.src('app/images/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images task completed!' }));
});

gulp.task('imageDel', function() {
    return del(['dist/images']);
});

gulp.task('watch', ['browser-sync'], function() {
    //gulp.watch(['app/scripts/**/*.js', 'app/styles/**/*.css', 'app/**/*.html'], ['usemin']);
    gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);
    gulp.watch('app/images/**/*', ['imagemin']);
});

gulp.task('browser-sync', ['default'], function() {
    var files = [
        'app/**/*.html',
        'app/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*.png',
        'dist/**/*'
    ];

    browserSync.init(files, {

        server: {
            baseDir: 'dist',
            index: 'index.html'
        },

        reloadDelay: 1000
    });

    gulp.watch(['dist/**/*.*']).on('change', browserSync.reload);
});