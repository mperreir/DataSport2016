var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var less = require('gulp-less');

gulp.task('less', function () {
  return gulp.src('./sources/less/style.less')
    .pipe(less({
        paths: './sources/less'
    }))
    .on('error', function(error) {
      console.log(error);
    })
    .pipe(uglifycss())
    .pipe(gulp.dest('./build/'));
});

gulp.task('scripts', function() {
	gulp.src('./sources/js/app.js')
		.pipe(browserify({
		    debug: true,
        external: [
          'jquery',
          '.d3',
          'three',
          'tooltip',
          'yt',
          'inc'
        ]
		}))
    .on('error', function(error) {
      console.log(error);
    })
    .pipe(uglify())
		.pipe(gulp.dest('./build/'));
});

gulp.task('watch', function() {
    gulp.watch(['./sources/js/*.js', './sources/js/*/*.js', './sources/js/*/*/*.js'], ['scripts']);
    gulp.watch('./sources/less/*.less', ['less']);
});

gulp.task('default', ['watch', 'less', 'scripts']);