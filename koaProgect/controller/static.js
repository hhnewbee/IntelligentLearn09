const path = require('path');
const serve = require('koa-static');
const rootPath=require('../config').rootPath;
const serves = [serve(path.join(rootPath,'assets'))];
module.exports = serves;

