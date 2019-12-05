var gulp = require('gulp'),
    less = require('gulp-less'),
    prefix = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    smushit = require('gulp-smushit'),
    rename = require('gulp-rename')

gulp.task('Less', function (done) {
    gulp.src('static/less/*.less')//需要编译的less文件路径
        .pipe(less())//编译
        .pipe(prefix(['last 4 versions'], { cascade: true }))
        .pipe(minifyCss({
            keepSpecialComments: 0,//保留所有特殊前缀
            compatibility:'ie7'//保留ie7及以下兼容写法
        }))
        .pipe(rename({ extname: '.css' }))//后缀
        .pipe(gulp.dest('static/css/'))//生成目录
        .on('end', done);//结束
});


gulp.task('watch', function () {
    gulp.watch('static/less/*.less', ['Less']);
});