var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var typescript = require('gulp-tsc');

var config = {
    ts: [
        "src/*.ts",
        "src/**/*.ts",
    ],
    tasks: {
        default: ['clean-bundle', 'regular-build', 'ts-build'],
        dev: ['clean-bundle', 'dev-build', 'ts-build']
    }
}

gulp.task('clean-bundle', function(){
    return del(['dist/tsgamelib.js', 'dist/tsgamelib.ts']);
});

gulp.task('regular-build', function(){
    return gulp.src(config.ts)
        .pipe(typescript({ target: "ES5" }))
        .pipe(uglify())
        .pipe(concat('tsgamelib.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('dev-build', function(){
    return gulp.src(config.ts)
        .pipe(typescript())
        .pipe(concat('tsgamelib.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('ts-build', function(){
    return gulp.src(config.ts)
        .pipe(concat('tsgamelib.ts'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', config.tasks.default);
gulp.task('dev', config.tasks.dev);