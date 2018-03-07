const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function styles() {
	return gulp.src('./scss/style.scss')
		.pipe(sass({includePaths: ['scss']}))
		.pipe(postcss([autoprefixer]))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream())
}

function watch() {
	gulp.watch('./scss/**/*.scss', styles);
	gulp.watch('./index.html', passToBrowserSync);
}

function browserSyncInit(done) {
	browserSync.init({
			server: {
				index: 'index.html'
			}
	}, done);
}

function passToBrowserSync() {
	gulp.src('./index.html')
		.pipe(browserSync.stream())
}

exports.passToBrowserSync = passToBrowserSync;
exports.watch = watch;
exports.browserSyncInit = browserSyncInit;
exports.styles = styles;

gulp.task('serve', gulp.series(styles, gulp.parallel([watch, browserSyncInit])));
