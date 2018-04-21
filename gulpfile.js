let gulp  = require('gulp'),
    sass  = require('gulp-sass'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync').create();


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            open: true
        }
    });
});


gulp.task('sass', function () {
    return gulp.src('./sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.sass', ['sass']);
});

gulp.task('browserify', function() {
    return browserify('./module/main.js')
        .bundle()
        // Передаем имя файла, который получим на выходе, vinyl-source-stream
        .pipe(source('main.js'))
        .pipe(gulp.dest('./app/js/'));
});


gulp.task('watch', function () {
    gulp.watch('./module/**/*.js',['browserify']);
});

gulp.task('default', ['sass', 'sass:watch', 'browserify', 'watch', 'browser-sync']);