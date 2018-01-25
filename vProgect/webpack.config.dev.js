'use strict';
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './vProgect/src/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].build.js',
        chunkFilename: "[name].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
            },
            {
                test: /\.(jpg|png|svg|ttf|woff|woff2|gif|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            //webpack中已经包含了es5的解析器和更多相应的配置
            // {
            //     test:/\.js$/,
            //     loader:'babel-loader',
            //     // options:{
            //     //     presets:['es2015'],
            //     //     plugins:["syntax-dynamic-import"]
            //     // },
            //     exclude:/node_modules/
            // },
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
            template: './vProgect/src/index.html'
        }),
        new CleanWebpackPlugin(['dist']),
    ],
    devServer: {
        contentBase: './dist',
        port: 3000
    },
    devtool: '#eval-source-map',
};