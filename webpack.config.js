module.exports = {
	devtool: 'source-map',
	entry: {
		'delta':      ['./src/delta.es6.js'],
		'delta.full': ['babel/polyfill.js', './src/delta.es6.js']
	},
	output: {
		path: './dist',
		filename: '[name].js',
		library: 'DeltaJs',
		libraryTarget: 'umd',
		sourceMapFilename: '[file].map'
	},
	module: {
		loaders: [
			{ test: /\.es6\.js$/, loader: 'babel?compact=false' }
		]
	}
};
