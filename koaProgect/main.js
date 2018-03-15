const Koa = require('koa');
const cors = require('koa-cors');
const serves=require('./controller/static');
const routes=require('./routes');
const koaBody = require('koa-body');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
//跨域请求
app.use(cors());
app.use(koaBody({ multipart: true }));
//静态文件请求
serves.forEach(serve=>{
    app.use(serve);
});
//路由
app.use(routes.routes());

// 在端口3000监听:
app.listen(3100);
console.log('app started at port 3100...');