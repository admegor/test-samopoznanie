var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require("browser-sync").create();
 
gulp.task('sass', function () {
    return gulp.src('./project/sass/**/*.scss')    
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('./project/css'))
        .pipe(server.stream());
}); 

gulp.task('server', function () {
    server.init({
      server: 'project/',
      notify: false,
      open: true,
      cors: true,
      ui: false
    });
  
    gulp.watch('project/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('project/*.html').on('change', server.reload);
  });

  gulp.task('start', gulp.series('sass', 'server'));