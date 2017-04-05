const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
var devCss = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: 'css-loader'
});
module.exports = {
	entry: './src/script.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'script.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: devCss
			}
		]
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
		}),
		new ExtractTextPlugin('sample.css')
	]
}
