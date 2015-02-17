var gulp        = require('gulp')
	watch 		= require('gulp-watch')
	connect 	= require('gulp-connect')
	browserSync = require('browser-sync')
	sass 		= require('gulp-sass')
	concat 		= require('gulp-concat')
	gzip 		= require('gulp-gzip');
	//uglify 		= require('gulp-uglifyjs')
	//jsonminify 	= require('gulp-jsonminify');


gulp.task('browser-sync', function() {
    browserSync({
		//proxy: "192.168.1.187:8888"
		server: {
		    baseDir: "public"
		},
		port: 8080
    });
});


gulp.task('compress', function() {
    gulp.src('public/js/*.js')
    .pipe(gzip())
    .pipe(gulp.dest('public/js/'));
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('sass', function () {
    return gulp.src('sass/styles.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('jsmash', function () {
    gulp.src([
    	/*'bower_components/jquery-legacy/dist/jquery.min.js', 
    	'bower_components/modernizr/modernizr.js', 
    	'bower_components/gsap/src/minified/TweenMax.min.js', 
    	'bower_components/gsap/src/minified/easing/EasePack.min.js', 
    	'bower_components/socket.io-client/socket.io.js', 
		'bower_components/fastclick/lib/fastclick.js', 
		'bower_components/howler/howler.min.js'
		'public/js/device-control.js'*/
    	])
    .pipe(concat('dc.js'))
    .pipe(gulp.dest('public/js'))
});

gulp.task('default', ['browser-sync'], function () {
	gulp.watch("scss/*.scss", ['sass']);
	gulp.watch("public/js/*.js", ['bs-reload']);
	gulp.watch("public/*.html", ['bs-reload']);
	//gulp.watch("public/*.php", ['bs-reload']);
	//gulp.watch("public/svg/*.svg", ['svgbuild']);
});
