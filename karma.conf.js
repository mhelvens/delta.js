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
		browsers:      ['Chrome'],
		singleRun:     true,

		files: [
			'bower_components/bluebird/js/browser/bluebird.js',
			'bower_components/js-graph/dist/js-graph.js',
			'dist/**/*.js',
			'!dist/**/*.min.js',
			'test-dist/**/*.js'
		]
	});
};
