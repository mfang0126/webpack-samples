const path = require('path');

module.exports = {
	entry: './src/script.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'script.bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		open: true
	}
}