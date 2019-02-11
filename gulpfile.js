
var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect-php');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');

gulp.task('sass', function() {
	return gulp.src('src/assets/scss/**/*.scss') //matches any file in scss or child directory
	.pipe(sass()) //compile scss
	.pipe(gulp.dest('dist/assets/css/')) //set destination for compiled CSS
	.pipe(browserSync.reload({
		stream: true
	}))
});

// gulp.task('pack-css', function() {
// 	return gulp.src(['src/assets/css/main.css','src/assets/css/variables.css']) //choose which files to concat
// 	.pipe(concat('bundle.css')) //set concatinated CSS filename
// 	.pipe(gulp.dest('src/assets/css')) //set concat destination
// })

// gulp.task('minify-css', function(){
// 	return gulp.src('src/assets/css/bundle.css') //select file to minify
// 		.pipe(sourcemaps.init()) //initiate sourcemap
// 		.pipe(autoprefixer())
// 		.pipe(cleanCSS()) //minify css
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest('dist/assets/css')) //set destination for minified CSS and sourcemaps
// });

// gulp.task('htmlmin', function(){ //minimize all html even in php files
// 	return gulp.src(['./src/*.php','./src/*.html']) //what files to min
// 		.pipe(htmlmin({
// 			collapseWhitespace: true,
// 		}))
// 		.pipe(gulp.dest('./dist/')) //dest dir to pipe min html files
// })

// gulp.task('imagemin', function(){
// 	gulp.src('src/assets/images/*')
// 	.pipe (imagemin())
// 	.pipe(gulp.dest('dist/assets/images'))
// });

gulp.task('connect', function() {
    connect.server({ base: '../portfolio-new/', port: 8081, keepalive: true});
});

gulp.task('browserSync',['connect'], function() {
    browserSync({
        proxy: 'localhost/portfolio-new/',
        port: 8081,
        open: true,
        notify: false
    });
});

// gulp.watch('files-to-watch',['tasks' , 'to', 'run']);
// gulp.task('watch', ['array', 'of', 'tasks', 'to', 'complete','before', 'watch'], 'function() {})
gulp.task('watch', ['browserSync','sass'], function() { //browserSync must be listed before sass so it launches first and then sass so that it is up to date when the server spins up
	gulp.watch('src/assets/scss/**/*.scss', ['sass']) //watch all files and dirs in the array
	// gulp.watch(['src/**/*.php','src/**/*.html'], ['htmlmin']); //watch all files and dirs in the array
   gulp.watch('**/*.html', browserSync.reload);
   gulp.watch('./dist/assets/css/main.css', browserSync.reload);
})
