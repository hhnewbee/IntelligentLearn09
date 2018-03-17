const merge = require('webpack-merge');
const common = require('./webpack.config.common');
//代码压缩工具，用来压缩代码和清除未使用的代码
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');
//图片压缩
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = merge(common, {
    plugins: [
        //代码压缩
        new uglifyJSPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),
        //图片压缩配置
        new ImageminPlugin({
            pngquant: {
                quality: '95-100'
            }
        }),
        //指定生产环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});