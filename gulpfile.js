const gulp = require('gulp');
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const es2015Preset = require("babel-preset-es2015");
/**
 * 压缩js 将 ./src/js 所有的js文件进行压缩
 * 输出 ./dist/js
 */
gulp.task("default", () => {
    gulp
        .src('src/*.html')
        .pipe(gulp.dest('dist'));

    gulp.src("./src/*.js")
        .pipe(babel({
            presets: [es2015Preset]
        }))
        .pipe(uglify())
        .pipe(gulp.dest("dist"));
});