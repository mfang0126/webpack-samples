const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Bootstrap = require('extract-text-webpack-plugin');
const path = require('path');
var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader','css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
});
var cssConfig = isProd ? cssProd : cssDev;
module.exports = {
    entry: {
        home: './src/home.js',
        contact: './src/contact.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: cssConfig
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        stats: 'errors-only',
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Home',
            filename: 'index.html',
            template: './src/index.html',
            excludeChunks: ['contact'],
            hash: true
        }),
        new HtmlWebpackPlugin({
            title: 'Contact',
            filename: 'contact.html',
            excludeChunks: ['home'],
            template: './src/contact.html',
            hash: true
        }),
        new ExtractTextPlugin({
            filename: 'sample.css',
            disable: !isProd,
            allChunks: true
        })
    ]
};