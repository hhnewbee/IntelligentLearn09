const merge = require('webpack-merge');
const common = require('./webpack.config.common');
//代码压缩工具，用来压缩代码和清除未使用的代码
const uglifyJSPlugin=require('uglifyjs-webpack-plugin');
//图片压缩
const  ImageminPlugin = require('imagemin-webpack-plugin').default;

//样式文件代码分离
const extractCSS = new ExtractTextPlugin({
    filename: 'static/css/[name].[contenthash]-css.css',
    allChunks: true
});

const extractSCSS = new ExtractTextPlugin({
    filename: 'static/css/[name].[contenthash]-scss.css',
    allChunks: true
});

const extractVueSCSS = new ExtractTextPlugin({
    filename: 'static/css/[name].[contenthash]-vuescss.css',
    allChunks: true
});

module.exports = merge(common, {
       plugins: [
           //图片压缩配置
           new ImageminPlugin({
               disable: process.env.NODE_ENV !== 'production', // Disable during development
               pngquant: {
                   quality: '95-100'
               }
           }),
       ]
 });