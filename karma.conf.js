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
			'bower_components/js-graph/dist/js-graph.js',
			'dist/delta.js',
			'test/**/*.js'
		],
		preprocessors: {
			'test/**/*.js': ['babel']
		}
	});
};
