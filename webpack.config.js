module.exports = {
	devtool: 'source-map',
	entry: './src/delta.es6.js',
	output: {
		path: './dist',
		filename: 'delta.js',
		library: 'DeltaJs',
		libraryTarget: 'umd',
		sourceMapFilename: 'delta.js.map'
	},
	module: {
		loaders: [
			{ test: /\.es6\.js$/, loader: 'babel' }
		]
	}
};
