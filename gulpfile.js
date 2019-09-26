const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

function styles() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 2 versions']))
    // .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src('./src/js/**/*.js')
    .pipe(concat('scripts.min.js'))
    // .pipe(uglify({
    //   toplevel: true
    // }))
    .pipe(gulp.dest('./build/js'))
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch('./src/scss/**/*.scss', styles)
  gulp.watch('./src/js/**/*.js', scripts)
  gulp.watch("./*.html").on('change', browserSync.reload);
}

function clean() {
  return del(['build/*']);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('clean', clean);

gulp.task('build', gulp.series('clean', gulp.parallel(styles, scripts)) )

gulp.task('dev', gulp.series('build', 'watch'))
