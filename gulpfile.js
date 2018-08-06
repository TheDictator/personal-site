var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    cssmin      = require('gulp-cssnano'),
    prefix      = require('gulp-autoprefixer'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    sassLint    = require('gulp-sass-lint'),
    sourcemaps  = require('gulp-sourcemaps'),
    runSequence = require('run-sequence'),
    minifyJS = require('gulp-minify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    rev = require('gulp-rev'),
    RevAll = require('gulp-rev-all'),
    manifestFile = require('gulp-manifest');



var displayError = function(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin.error.bold + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;

    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber.bold;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
};

var onError = function(err) {
    notify.onError({
        title:    "Gulp",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
        sound:    "Basso"
    })(err);
    this.emit('end');
};

var sassOptions = {
    outputStyle: 'expanded'
};

var prefixerOptions = {
    browsers: ['last 2 versions']
};

// BUILD SUBTASKS
// ---------------

// Gulp task to minify HTML files
gulp.task('pages', function() {
    return gulp.src(['./build/index.html'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./public_html'));
});
gulp.task('styles', function() {
    return gulp.src('./build/scss/custom/app.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(prefix(prefixerOptions))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('./build/stylesheets'))
        .pipe(cssmin())
        .pipe(RevAll.revision())
        .pipe(gulp.dest('public_html/assets/stylesheets'))
        .pipe(RevAll.manifestFile())
        .pipe(gulp.dest('public_html/assets/stylesheets'))
});

gulp.task('sass-lint', function() {
    gulp.src('./build/scss/custom/app.scss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task('js-plugins', function(){
    return gulp.src(['./build/js/scripts/*.js'])
        .pipe(minifyJS())
        .pipe(concat('scripts.min.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest('./public_html/assets/js'));
});

gulp.task('js-custom', function(){
    return gulp.src(['./build/js/custom/init.js'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(minifyJS())
        .pipe(concat('custom.min.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest('./public_html/assets/js'))
        .pipe(gulp.dest('./public_html/assets/js'));
});

gulp.task('watch', function() {
    gulp.watch('./build/scss/custom/app.scss', ['styles']);
    gulp.watch('./build/js/scripts/*.js', ['js-plugins']);
    gulp.watch('./build/index.html', ['pages']);
});
// BUILD TASKS
// ------------

gulp.task('default', function(done) {
    runSequence('styles','watch', done);
});

gulp.task('build', function(done) {
    runSequence('styles', done);
});