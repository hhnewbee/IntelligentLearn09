//这里面的路径都是以package.json文件为参考的
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//css文件解析的配置参数
const styleParam = ['css-loader?minimize', 'autoprefixer-loader', 'sass-loader',];
//生产环境时的css路径配置
const cssPath = '';

//样式文件代码分离
const extractCSS = new ExtractTextPlugin({
    filename: cssPath + '[name].[contenthash]-css.css',
    allChunks: true
});

const extractSCSS = new ExtractTextPlugin({
    filename: cssPath + '[name].[contenthash]-scss.css',
    allChunks: true
});

const extractVueSCSS = new ExtractTextPlugin({
    filename: cssPath + '[name].[contenthash]-vuescss.css',
    allChunks: true
});
module.exports = {
    entry: {
        main: './vueProgect/src',
        indexVue:'./vueProgect/src/components/index.vue',
        vendor1: ["vue",'element-ui'],
        vendor2:["moment",'axios'],
        vendor3:["video.js/dist/video.min.js"],
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
                use: extractCSS.extract(['css-loader', 'autoprefixer-loader']),
            },
            {
                test: /\.scss$/,
                use: extractSCSS.extract(
                    [
                        ...styleParam,
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: [
                                    './vueProgect/src/static/scss/mixins.scss',
                                    './vueProgect/src/static/scss/var.scss',
                                ]
                            }
                        },
                    ]
                )
            },
            //在vue-loader中使用options并没有产生相应的作用，反而会影响.babelrc的执行
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: extractVueSCSS.extract({
                            use: [
                                ...styleParam,
                                //抽取出vue中scss的全局变量
                                {
                                    loader: 'sass-resources-loader',
                                    options: {
                                        resources: [
                                            './vueProgect/src/static/scss/mixins.scss',
                                            './vueProgect/src/static/scss/var.scss',
                                        ]
                                    }
                                },
                            ]
                        })
                    }
                }
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'static/404page/'
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
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './vueProgect/src/index.html',
            title:'智能在线学习平台',
            filename: 'index.html',
            favicon: './vueProgect/src/static/imgs/softIcon.png'
        }),
        new CleanWebpackPlugin(['dist']),
        //让render的哈希值不随文件的增删改变
        new webpack.HashedModuleIdsPlugin(),
        //抽取第三方库以及公共模块
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor1','vendor2','vendor3'],
            //只有vendor的内容才能被打包进来
            minChunks: Infinity,
        }),
        //抽取公共块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // 指定公共 bundle 的名称。
        }),
        extractCSS,
        extractSCSS,
        extractVueSCSS,
    ],
};