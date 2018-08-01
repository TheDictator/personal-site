// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');

var connect = require('gulp-connect');

const autoprefixer = require('gulp-autoprefixer');

// Lint Task
// gulp.task('lint', function() {
//     return gulp.src('./system/user/templates/ide/js.group/js.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('./public_html/assets/scss/custom/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('./assets/stylesheets/'))
        //.pipe(connect.reload());
});

// Minify and move ide.js file
// gulp.task('js', function(callback) {
//     pump([
//         gulp.src('./system/user/templates/ide/js.group/ide.js.js'),
//         uglify({
//             compress: {
//                 drop_console: true,
//             },
//             mangle: false
//         }),
//         rename('ide.min.js.js'),
//         gulp.dest('./system/user/templates/ide/js.group/'),
//     ], callback);
// });

// Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src('js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('dist'))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

// gulp.task('connect', function() {
//     connect.server({
//         root: './app',
//         livereload: true
//     });
// });
// Watch Files For Changes
gulp.task('watch', function() {
    //gulp.watch('./system/user/templates/ide/js.group/*.js', ['lint']);
    gulp.watch('./public_html/assets/scss/custom/app.scss', ['sass']);
    //gulp.watch('./sandbox/js/ide.js', ['js']);
});

// Copy/Move CSS To Theme Folder
// gulp.task('prod', function() {
//     return gulp.src('./sandbox/stylesheets/main.css')
//         .pipe(rename('main.css.css'))
//         //.pipe(uglify())
//         .pipe(gulp.dest('./system/user/templates/ide/stylesheets.group/'));
// });

// Default Task
gulp.task('default', ['watch']);

// Error handler
function handleError(err) {
    log(err.toString());
    this.emit('end');
}
