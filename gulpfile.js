var gulp = require('gulp');

var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');

gulp.task('styles', function() {
  gulp.src('style/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('style/css'));
});

//Watch task
gulp.task('watch', function() {
  gulp.watch('style/scss/**/*.scss',['styles']);
});

gulp.task('default', ['styles']);