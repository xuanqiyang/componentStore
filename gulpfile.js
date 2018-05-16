var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),//图片压缩
sass = require('gulp-sass'),//sass编译
cleanCss = require('gulp-clean-css'),//css压缩
jshint = require('gulp-jshint'),//js检测
uglify = require('gulp-uglify'),//js压缩
rename = require('gulp-rename'),//更改文件名
concat = require('gulp-concat'),//合并文件
clean = require('gulp-clean'),//删除文件
plumber = require('gulp-plumber'),//输出错误
autoPrefixer = require('gulp-autoprefixer'),//自动添加前缀
sprite = require('gulp.spritesmith'),//sprite生成
fileSync = require('gulp-file-sync'),//文件操作同步
changed = require('gulp-changed'),//只监听修改的文件
browserSync = require('browser-sync').create(),//浏览器同步刷新
sourcemaps = require('gulp-sourcemaps');

var reload = browserSync.reload;

gulp.task('server',function(){
	browserSync.init({
		server:{
			baseDir: 'dist/'
		}
	});
});

// 监听任务 运行语句 gulp watch
gulp.task('watch', function() {
    // 监听html
    gulp.watch('src/**/*.html', function() {
        gulp.run('html');
    }).on("change", reload);
    // 监听css
    gulp.watch('src/scss/*', function() {
        gulp.run('sass');

    }).on("change", reload);
    // 监听js
    gulp.watch('src/js/*.js', function() {
        gulp.run('js');
    }).on("change", reload);
    // 监听images
    gulp.watch('src/images/**', function() {
        gulp.run('images');
    }).on("change", reload);
});

//HTML处理
gulp.task('html', function() {
    var htmlSrc = 'src/**/*.html',
        htmlDst = 'dist';

    return gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(plumber())
        .pipe(gulp.dest('dist'))
        .pipe(reload({ stream: true }));
});
// 样式处理
gulp.task('sass', function() {
    var cssSrc = 'src/scss/*',
        cssDst = 'dist/css';

    return gulp.src(cssSrc)
        .pipe(changed(cssDst))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoPrefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./maps/'))
        // .pipe(cleanCss())
        .pipe(gulp.dest(cssDst))
        .pipe(reload({ stream: true }));
});
// js处理
gulp.task('js', function() {
    var jsSrc = 'src/js/**/*.js',
        jsDst = 'dist/js';

    return gulp.src(jsSrc)
        .pipe(changed(jsDst))
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        // .pipe(concat('main.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest(jsDst))
        .pipe(reload({ stream: true }));
});
// 图片处理
gulp.task('images', function() {
    var imgSrc = 'src/images/**',
        imgDst = 'dist/images';

    return gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst))
        .pipe(reload({ stream: true }));
});



//同步文件删除添加操作
gulp.task('sync',function(){
    return gulp.watch(['src/**'],function(){
        fileSync('src','dist',{recursive:false});
    }).on("change",reload);
});

// 清空图片、样式、js
gulp.task('cleanfile', function() {
    return gulp.src(['dist/images', 'dist/css', 'dist/js'], { read: false })
        .pipe(clean());
});
gulp.task('build',['sync','html','sass','js','images']);
// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['cleanfile'], function() {
    return gulp.start('build','watch','server');
});
// gulp.tack('sprite',function(){
//  var cssSrc = 'src/scss/*',
//       cssDst = 'dist/css';
//  var spriteData = gulp.src('images/*.png').pipe(sprite({
//          imgName:'sprite.png',
//          cssName:'sprite.scss',
//          cssFormat:'scss'
//      }));
//  return spriteData.pipe(gulp.dest(cssDst));
// })
