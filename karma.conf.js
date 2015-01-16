module.exports = function (config) {
	config.set({
		basePath:      '',
		frameworks:    ['jasmine'],
		exclude:       [],
		reporters:     ['progress'],
		port:          9876,
		colors:        true,
		logLevel:      config.LOG_INFO,
		autoWatch:     false,
		singleRun:     true,
		browsers:      ['PhantomJS'],

		files: [
			'bower_components/bluebird/js/browser/bluebird.js',
			'bower_components/js-graph/dist/js-graph.js',
			'test/polyfills.js',
			'dist/**/*.js',
			'!dist/**/*.min.js',
			'test-dist/**/*.js'
		]
	});
};
