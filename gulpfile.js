// Modules.
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    karmaServer = require('karma').Server,
    paths = {
        build: {
            path: 'build/'
        },
        source: {
            js: 'source/bem.js'
        },
        tests: {
            karmaConfig: __dirname + '\\tests\\config\\karma\\karma.js'
        }
    };

// Tasks.
gulp.task('default', ['build', 'watch']);

gulp.task('concatenate-js', function () {
    return gulp.src(paths.source.js)
        .pipe(concat('jquery-bem.js'))
        .pipe(gulp.dest(paths.build.path));
});

gulp.task('minify-js', function () {
    return gulp.src(paths.source.js)
        .pipe(uglify())
        .pipe(concat('jquery-bem.min.js'))
        .pipe(gulp.dest(paths.build.path));
});

gulp.task('build', ['concatenate-js', 'minify-js']);

gulp.task('watch', function () {
    gulp.watch(paths.source.js, ['minify-js', 'concatenate-js']);
});

// Unit tests.
gulp.task('unit-test', function (complete) {
    new karmaServer({
        configFile: paths.tests.karmaConfig,
        singleRun: false
    }, complete).start();
});

gulp.task('unit-test-once', function (complete) {
    new karmaServer({
        configFile: paths.tests.karmaConfig,
        singleRun: true
    }, complete).start();
});