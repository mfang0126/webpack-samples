var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var bootstrapEntryPoints = require('./webpack.bootstrap.config');
var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
});
var cssConfig = isProd ? cssProd : cssDev;
var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry: {
        home: './src/home.js',
        contact: './src/contact.js',
        bootstrap: bootstrapConfig
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: cssConfig
        },
        {
            test: /\.(woff2?|svg)$/, 
            use: 'url-loader?limit=10000&name=fonts/[name].[ext]'
        },
        {
            test: /\.(ttf|eot)$/,
            use: 'file-loader?name=fonts/[name].[ext]'
        },
        { 
            test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, 
            use: 'imports-loader?jQuery=jquery' 
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        stats: 'errors-only',
        hot: true,
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
            filename: '/css/[name].css',
            disable: !isProd,
            allChunks: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};
