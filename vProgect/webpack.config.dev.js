'use strict';
const path=require('path');
const htmlWebpackPlugin=require('html-webpack-plugin');
module.exports= {
    entry: {
        main:'./vProgect/src/main.js'
    },
    output:{
        path:path.join(__dirname,'dist'),
        filename:'[name].build.js'
    },
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:'style-loader!css-loader!autoprefixer-loader'
            },
            {
                test:/\.less$/,
                loader:'style-loader!css-loader!autoprefixer-loader!less-loader'
            },
            {
                test:/\.(jpg|png|svg|ttf|woff|woff2|gif)$/,
                loader:'url-loader',
                options:{
                    limit:4096,//4096字节以上生成文件，否则base64
                    name:'[name].[ext]'
                }
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                // options:{
                //     presets:['es2015'],
                //     plugins:['transform-runtime']
                // },
                exclude:/node_modules/
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            //该插件并没有转义
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./vProgect/src/index.html'
        })
    ],
    devServer:{
        contentBase:'./mui',
        port:3000
    },
    devtool: '#eval-source-map',
};