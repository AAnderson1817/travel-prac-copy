var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin');

gulp.task('deleteDistFolder', function(){
  return del("./dist");
})


gulp.task('optimizeImages',['deleteDistFolder'], function(){
  //The code below takes all the images in our development folder and excludes any icons and related files. Users only need the sprites. We'll pipe it through a compressor module and send it to the /dist folder for distribution. //
  return gulp.src(['./app/assets/images/**/*.', '!app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true, //optimizes JPEG //
      interlaced: true, //assists with GIFs//
      multipass: true //helps with SVGs //
    }))
    .pipe(gulp.dest("./dist/assets/images"));
});

gulp.task('usemin',['deleteDistFolder'], function(){
  return gulp.src("./app/index.html")
    .pipe(usemin())
    .pipe(gulp.dest("./dist"));
})

gulp.task('build', ['deleteDistFolder','optimizeImages', 'usemin']);
