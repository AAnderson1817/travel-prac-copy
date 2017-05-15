var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function(){
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
})

gulp.task('deleteDistFolder',['icons'], function(){
  return del("./docs");
})

gulp.task('copyGeneralFiles',['deleteDistFolder'], function(){
  var pathsToCopy = [
      './app/**/*',
      '!./app/index.html',
      '!./app/assets/imagse/**',
      '!./app/assets/styles/**',
      '!./app/assets/scripts/**',
      '!./app/temp',
      '!./app/temp/**'
  ];

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./docs'));
});


gulp.task('optimizeImages',['deleteDistFolder'], function(){
  //The code below takes all the images in our development folder and excludes any icons and related files. Users only need the sprites. We'll pipe it through a compressor module and send it to the /dist folder for distribution. //
  return gulp.src(['./app/assets/images/**/*.', '!app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true, //optimizes JPEG //
      interlaced: true, //assists with GIFs//
      multipass: true //helps with SVGs //
    }))
    .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function(){
    gulp.start("usemin");
});

gulp.task('usemin',['styles', 'scripts'], function(){
  return gulp.src("./app/index.html")
    .pipe(usemin({
      css: [function(){return rev()}, function(){return cssnano()}],
      js: [function(){return rev()}, function(){return uglify()}]
    }))
    .pipe(gulp.dest("./docs"));
})

gulp.task('build', ['deleteDistFolder','copyGeneralFiles','optimizeImages', 'useminTrigger']);
