'use strict';
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
        filename:'[name].[contenthash]-one.css',
        allChunks:true
    });

const extractSCSS = new ExtractTextPlugin({
    filename:'[name].[contenthash]-two.css',
    allChunks:true
});

module.exports = {
    entry: {
        main: './vProgect/src',
        vendor: [
            './vProgect/src/static/venders/unitUpload.js'
        ],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].bundle.[chunkhash].js',
        chunkFilename: "js/[name].[chunkhash].js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                use: extractCSS.extract([ 'css-loader', 'autoprefixer-loader' ]),
            },
            {
                test: /\.scss$/,
                use: extractSCSS.extract([ 'css-loader', 'autoprefixer-loader','sass-loader' ])
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'static/images/'
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'static/font/'
                }
            },
            //webpack中已经包含了es5的解析器和更多相应的配置
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            //在vue-loader中使用options并没有产生相应的作用，反而会影响.babelrc的执行
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            //该插件并没有转义
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader',
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './vProgect/src/index.html',
            filename:'index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        //让render的哈希值不随文件的增删改变
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        //抽取公共块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // 指定公共 bundle 的名称。
        }),
        extractCSS,
        extractSCSS
    ],
    devServer: {
        contentBase: './dist',
        port: 3000,
        host: "0.0.0.0"
    },
    devtool: '#eval-source-map',
};