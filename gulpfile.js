const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
    gulp
        .src('src/*.html')
        .pipe(gulp.dest('dist'));

    return gulp.src('src/*.js')
        .pipe(babel({
            presets: ['es2017']
        }))
        .pipe(gulp.dest('dist'));
});
