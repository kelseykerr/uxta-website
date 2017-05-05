var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var serve = require('gulp-serve');
var connect = require('gulp-connect');

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
  ' */\n',
  ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function() {
  return gulp.src('less/styles.less')
    .pipe(less())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
  return gulp.src('css/styles.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify JS
gulp.task('minify-js', function() {
  return gulp.src('js/app.js')
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

/* Watch Files For Changes */
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('js/*.js', {
    ignoreInitial: false
  });
  gulp.watch('css/*.css', {
    ignoreInitial: false
  });
  gulp.watch('index.html', {
    ignoreInitial: false
  });

})

gulp.task('serve', serve('public'));

gulp.task('webserver', function() {
  connect.server();
});

// Run everything
gulp.task('default', ['watch', 'serve', 'webserver']);

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js'], function() {
  gulp.watch('less/*.less', ['less']);
  gulp.watch('css/*.css', ['minify-css']);
  //gulp.watch('js/*.js', ['minify-js']);
  gulp.watch('js/*.js', browserSync.reload);

  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});
