var HtmlWebpackPlugin = require('html-webpack-plugin');
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
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Home',
			filename: 'index.html',
			template: './src/index.html',
			hash: true
		})
	]
}