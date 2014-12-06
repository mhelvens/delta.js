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
var traceur = require('gulp-traceur');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function externalModule(modName, varName) {
	if (!varName) { return modName }
	var obj = {};
	obj[modName] = {root: varName, commonjs2: modName, commonjs: modName, amd: modName};
	return obj;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var INTERNAL_LIBRARIES = [];
var EXTERNAL_LIBRARIES = [];
var APPLICATIONS = [];

fs.readdirSync('./modules')
		.map(function (filename) { return fs.readFileSync('./modules/' + filename) })
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


/* Webpack configuration shared for both apps and libraries */
var WEBPACK_COMMON = {
	devtool: 'inline-source-map',
	module : {
		loaders: [
			{test: /\.scss$/, loader: "style!css!autoprefixer!sass"},
			{test: /\.css$/, loader: "style!css!autoprefixer"},
			{test: /\.js/, loader: "traceur?script"}
		]
	}
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


gulp.task('lint', function () {
	return gulp.src('src/**/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'))
			.pipe(jshint.reporter('fail'));
});

INTERNAL_LIBRARIES.concat(APPLICATIONS).forEach(function (m) {

	/* the webpack task for the internal module */
	gulp.task('webpack:' + m.name, function (callback) {

		var config = (m.type === 'internal-library') ? {
			entry    : './src/' + m.file,
			externals: EXTERNAL_LIBRARIES.map(function (lib) { return lib.webpackExternal }),
			output   : {
				path             : './dist',
				filename         : m.file,
				library          : m.var,
				libraryTarget    : 'umd',
				sourceMapFilename: m.file + '.map'
			}
		} : { // 'application'
			entry  : './src/' + m.dir + '/' + m.file,
			output : {
				path             : './dist/' + m.dir,
				filename         : m.file,
				sourceMapFilename: m.file + '.map'
			},
			resolve: {
				modulesDirectories: ['node_modules', 'bower_components'],
				alias             : WEBPACK_ALIAS
			},
			target : 'web'
		};


		if (m.type === 'internal-library') {
			config = {
				entry    : './src/' + m.file,
				externals: EXTERNAL_LIBRARIES.map(function (lib) { return lib.webpackExternal }),
				output   : {
					path             : './dist',
					filename         : m.file,
					library          : m.var,
					libraryTarget    : 'umd',
					sourceMapFilename: m.file + '.map'
				}
			};
		} else if (m.type === 'application') {
			config = {
				entry  : './src/' + m.dir + '/' + m.file,
				output : {
					path             : './dist/' + m.dir,
					filename         : m.file,
					sourceMapFilename: m.file + '.map'
				},
				resolve: {
					modulesDirectories: ['node_modules', 'bower_components'],
					alias             : WEBPACK_ALIAS
				},
				target : 'web'
			};
		}

		webpack(_.defaults(config, WEBPACK_COMMON), function (err, stats) {
			if (err) { throw new gutil.PluginError('webpack', err) }
			gutil.log(stats.toString({colors: true}));
			callback();
		});

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
			return 'build:' + mod.name
		})
);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/* build tests with traceur */
gulp.task('build-tests', function () {
	return gulp.src('test/**/*.js')
			.pipe(traceur({script: true}))
			.pipe(gulp.dest('test-dist'));
});

/* run tests */
gulp.task('test', ['build', 'build-tests'], function () {
	return gulp.src(EXTERNAL_LIBRARIES.map(function (lib) {
		return lib.dir + '/' + lib.file;
	}).concat([
		'dist/**/*.js',
		'!dist/**/*.min.js',
		'test-dist/**/*.js'
	])).pipe(karma({configFile: 'karma.conf.js'}));
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


gulp.task('watch', function () {
	gulp.watch([
		'src/**/*.js',
		'src/**/*.scss',
		'src/**/*.css',
		'src/**/*.html'
	], ['lint', 'build']);
	gulp.watch([
		'test/**/*.js'
	], ['build-tests']);
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


['major', 'minor', 'patch', 'prerelease'].forEach(function (type) {
	gulp.task('bump:' + type, function () {
		return gulp.src(['package.json', 'bower.json'])
				.pipe(bump({type: type}))
				.pipe(gulp.dest('./'));
	});
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


gulp.task('default', ['lint', 'build', 'watch']);
