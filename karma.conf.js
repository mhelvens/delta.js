module.exports = function (config) {
	var conf = require('./karma.common.js');
	conf.preprocessors['./src/*.es6.js'] = ['coverage']; // needed for coverage results in WebStorm
	config.set(conf);
};
