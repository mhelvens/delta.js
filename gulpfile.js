var fs = require('fs');
var _ = require('lodash');
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	traceur = require('gulp-traceur'),
	webpack = require('webpack'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	karma = require('gulp-karma'),
	rimraf = require('rimraf'),
	sourcemaps = require('gulp-sourcemaps'),
	bump = require('gulp-bump');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//
// this list tells Webpack where to find specific package files
// relative to 'node_modules' and 'bower_components' and should
// be expanded when necessary
//
var WEBPACK_ALIAS = {
	'jquery': 'jquery/dist/jquery.js',
	'js-graph': 'js-graph/dist/js-graph.js',
	'bluebird': 'bluebird/js/main/bluebird.js',
	'chroma-js': 'chroma-js/chroma.js',
	'd3': 'd3/d3.js',
	'three-js': 'three.js/three.js',
	'lodash': 'lodash/dist/lodash.min.js'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function externalModule(modName, varName) {
	if (!varName) { return modName }
	var obj = {};
	obj[modName] = { root: varName, commonjs2: modName, commonjs: modName, amd: modName };
	return obj;
}

function logAndKeepGoing(stream) {
	return function (e) { gutil.log(gutil.colors.red(e)); (stream || this).end(); }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var MODULES = [];
var EXTERNAL_MODULES = [];

fs.readdirSync('./modules')
	.map(function (filename) { return fs.readFileSync('./modules/'+filename) })
	.map(JSON.parse)
	.forEach(function (mod) {
		if (mod.external || mod.type === 'external-library') {
			EXTERNAL_MODULES.push(externalModule(mod.name, mod.var));
		} else {
			MODULES.push(mod);
		}
	});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('lint', function () {
	return gulp.src('src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('clean-tmp', function (callback) {
	rimraf('./.intermediate-output', callback);
});

gulp.task('traceur', ['clean-tmp', 'lint'], function () {
	return gulp.src('src/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(traceur({
			script: true,
			sourceMaps: true
		}))
		.on('error', logAndKeepGoing())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('.intermediate-output'));
});

gulp.task('copy-non-js-files', ['clean-tmp'], function () {
	return gulp.src(['src/**/*.scss', 'src/**/*.html'])
		.pipe(gulp.dest('.intermediate-output'));
});

MODULES.forEach(function (m) {
	// see all MODULES as external to each other
	var ownExternals = [];
	MODULES.forEach(function (mExt) {
		if (mExt !== m) {
			ownExternals.push(externalModule('./' + mExt.file));
		}
	});

	// Webpack configuration shared for both apps and libraries
	var commonConfig = {
		devtool: 'inline-source-map',
		module: {
			preLoaders: [
				{ test: /\/(?!addStyles)[^\/]+\.js$/, loader: "source-map" }
			],
			loaders: [
				{ test: /\.scss$/, loader: "style!css!autoprefixer!sass" }
			]
		}
	};

	gulp.task('webpack:' + m.name, ['traceur', 'copy-non-js-files'], function (callback) {
		// output after Webpack does its thing
		function webpackCallback(err, stats) {
			if (err) { throw new gutil.PluginError('webpack', err) }
			gutil.log(stats.toString({ colors: true }));
			callback();
		}

		if (m.type === 'internal-library') {
			webpack(_.defaults({
				entry: './.intermediate-output/' + m.file,
				externals: EXTERNAL_MODULES.concat(ownExternals),
				output: {
					path: './dist',
					filename: m.file,
					libraryTarget: 'umd',
					sourceMapFilename: m.file+'.map'
				}
			}, commonConfig), webpackCallback);
		} else if (m.type === 'application') {
			webpack(_.defaults({
				entry: './.intermediate-output/' + m.dir + '/' + m.file,
				output: {
					path: './dist/' + m.dir,
					filename: m.file,
					sourceMapFilename: m.file+'.map'
				},
				resolve: {
					modulesDirectories: ['node_modules', 'bower_components'],
					alias: WEBPACK_ALIAS
				},
				target: 'web'
			}, commonConfig), webpackCallback);
		}
	});
	if (m.type === 'internal-library') {
		gulp.task('uglify:' + m.name, ['webpack:' + m.name], function () {
			return gulp.src('dist/**/' + m.file)
				.pipe(uglify())
				.pipe(rename({suffix: '.min'}))
				.pipe(gulp.dest('dist'));
		});
		gulp.task('build:' + m.name, ['webpack:' + m.name, 'uglify:' + m.name]);
	} else if (m.type === 'application') {
		gulp.task('copy-html:' + m.name, function () {
			return gulp.src(['src/' + m.dir + '/*.html'])
				.pipe(gulp.dest('dist/' + m.dir));
		});
		gulp.task('build:' + m.name, ['webpack:' + m.name, 'copy-html:' + m.name]);
	}
});

gulp.task('build', MODULES.map(function (mod) { return 'build:'+mod.name }));

gulp.task('karma', ['build'], function () {
	return gulp.src([
		'bower_components/jquery/dist/jquery.js',
		'bower_components/jquery-ui/jquery-ui.js',
		'dist/**/*.min.js',
		'test/**/*.js'
	]).pipe(karma({ configFile: 'karma.conf.js' }));
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('watch', function () {
	gulp.watch(['src/**/*.js', 'src/**/*.scss', 'src/**/*.html'], ['build']);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

['major', 'minor', 'patch', 'prerelease'].forEach(function (type) {
	gulp.task('bump:'+type, function () {
		return gulp.src(['package.json', 'bower.json'])
			.pipe(bump({ type: type }))
			.pipe(gulp.dest('./'));
	});
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('default', ['build', 'watch']);
