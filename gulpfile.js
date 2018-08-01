var gulp        = require('gulp');
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', function() {

    gulp.watch("scss/custom/app.scss", ['sass']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/custom/app.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("public_html/assets/stylesheets"));
});

gulp.task('default', ['sass', 'serve']);