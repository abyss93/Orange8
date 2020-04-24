var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var paths = {
    pages: ['src/*.html'],
    assets: ['assets/*']
};

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-assets', function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('default', gulp.series(gulp.parallel('copy-html', 'copy-assets'), function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['./src/Main.ts'],
        cache: {},
        packageCache: {},
        standalone: "chip8Emulator"
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));
}), gulp.src('./src/index.css').pipe(gulp.dest('./dist')));