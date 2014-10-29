/* general libraries */
var fs = require('fs');
var _ = require('lodash');

/* specific task libraries */
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var webpack = require('webpack');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var karma = require('gulp-karma');
var bump = require('gulp-bump');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function externalModule(modName, varName) {
	if (!varName) { return modName }
	var obj = {};
	obj[modName] = { root: varName, commonjs2: modName, commonjs: modName, amd: modName };
	return obj;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var INTERNAL_LIBRARIES = [];
var EXTERNAL_LIBRARIES = [];
var APPLICATIONS = [];

fs.readdirSync('./modules')
		.map(function (filename) { return fs.readFileSync('./modules/'+filename) })
		.map(JSON.parse)
		.forEach(function (mod) {
			if (mod.type === 'external-library') {
				mod.webpackExternal = externalModule(mod.name, mod.var);
				EXTERNAL_LIBRARIES.push(mod);
			} else if (mod.type === 'internal-library') {
				INTERNAL_LIBRARIES.push(mod);
			} else if (mod.type === 'application') {
				APPLICATIONS.push(mod);
			}
		});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/* tell Webpack where to find specific external library files */
var WEBPACK_ALIAS = {};
EXTERNAL_LIBRARIES.forEach(function (mod) {
	WEBPACK_ALIAS[mod.name] = mod.dir + '/' + mod.file;
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


gulp.task('lint', function () {
	return gulp.src('src/**/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'))
			.pipe(jshint.reporter('fail'));
});

INTERNAL_LIBRARIES.concat(APPLICATIONS).forEach(function (m) {

	/* Webpack configuration shared for both apps and libraries */
	var commonConfig = {
		devtool: 'inline-source-map',
		module: {
			loaders: [
				{ test: /\.scss$/, loader: "style!css!autoprefixer!sass" },
				{ test: /\.css$/, loader: "style!css!autoprefixer" },
				{ test: /\.js/, loader: "traceur?script" }
			]
		}
	};

	/* the webpack task for the internal module */
	gulp.task('webpack:' + m.name, function (callback) {
		// output after Webpack does its thing
		function webpackCallback(err, stats) {
			if (err) { throw new gutil.PluginError('webpack', err) }
			gutil.log(stats.toString({ colors: true }));
			callback();
		}

		if (m.type === 'internal-library') {
			webpack(_.defaults({
				entry: './src/' + m.file,
				externals: EXTERNAL_LIBRARIES.map(function (lib) { return lib.webpackExternal }),
				output: {
					path: './dist',
					filename: m.file,
					library: m.var,
					libraryTarget: 'umd',
					sourceMapFilename: m.file+'.map'
				}
			}, commonConfig), webpackCallback);
		} else if (m.type === 'application') {
			webpack(_.defaults({
				entry: './src/' + m.dir + '/' + m.file,
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

	/* the build-task for internal libraries */
	if (m.type === 'internal-library') {
		gulp.task('uglify:' + m.name, ['webpack:' + m.name], function () {
			return gulp.src('dist/**/' + m.file)
					.pipe(uglify())
					.pipe(rename({suffix: '.min'}))
					.pipe(gulp.dest('dist'));
		});
		gulp.task('build:' + m.name, ['webpack:' + m.name, 'uglify:' + m.name]);
	}

	/* the build-task for applications */
	if (m.type === 'application') {
		gulp.task('copy-html:' + m.name, function () {
			return gulp.src(['src/' + m.dir + '/*.html'])
					.pipe(gulp.dest('dist/' + m.dir));
		});
		gulp.task('build:' + m.name, ['webpack:' + m.name, 'copy-html:' + m.name]);
	}

});

/* 'build everything' task */
gulp.task('build',
		INTERNAL_LIBRARIES.concat(APPLICATIONS).map(function (mod) {
			return 'build:'+mod.name
		}));

/* test task */
gulp.task('test', ['build'], function () {
	return gulp.src(EXTERNAL_LIBRARIES.map(function (lib) {
		return lib.dir + '/' + lib.file;
	}).concat([
		'dist/**/*.js',
		'!dist/**/*.min.js',
		'',
		'test/**/*.js'
	])).pipe(karma({ configFile: 'karma.conf.js' }));
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


gulp.task('watch', function () {
	gulp.watch([
		'src/**/*.js',
		'src/**/*.scss',
		'src/**/*.css',
		'src/**/*.html'
	], ['lint', 'build', 'test']);
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


gulp.task('default', ['lint', 'build', 'watch']);
