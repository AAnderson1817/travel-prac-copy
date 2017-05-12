var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');

var config = {
  //We use "shape, spacing, and padding properties" to add a bit of spacing between the sprites. This helps prevent artifacts from neighboring sprites from appearing. //
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      variables: {
        //This function takes the file name string i.e. "fox.svg" and splits the name from it's file type designation; "fox" and ".svg". The function then joins together "fox" with ".png" to create "fox.png" which we need to make our site as browser-friendly as possible. //
        replaceSvgWithPng: function() {
          return function(sprite, render) {
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

gulp.task('beginClean', function() {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
});
//Items in square brackets are known as "dependencies". Simply, if a function has a dependency, the dependency must complete first before the function will run. 'createSprite', for example, waits for 'beginClean' to complete before firing.//
gulp.task('createSprite', ['beginClean'], function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('createPngCopy', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
});

gulp.task('copySpriteGraphic', ['createPngCopy'], function() {
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
  return del('./app/temp/sprite');
});

gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
