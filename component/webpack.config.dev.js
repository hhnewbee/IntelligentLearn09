const merge = require('webpack-merge');
const common=require('./webpack.config.common');
module.exports = merge(common, {
    devServer: {
        contentBase: './dist',
        port: 3300,
        host: "0.0.0.0"
    },
    devtool: '#eval-source-map',
});