const Router = require('koa-router');
//前端接口
const apiGet = require('./controller/api');
const upload = require('./controller/upload');
const comments=require('./controller/comments');
let router = new Router();

/**
 * 添加文章
 */
router.post("/IL09api/posts", async (ctx, next) => {
    let body = Object.assign(ctx.request.body, {replys: '0'}, {likes: '0'});
    await apiGet.addAll(ctx, next, "posts", body);
});

/**
 * 获取文章
 */
router.get("/IL09api/posts/:articleId", async (ctx, next) => {
    //根据文章id查询文章
    await apiGet.getAll(ctx, next, "posts",{where: {id:ctx.params.articleId}});
});

/**
 * 上传图片
 */
router.post("/upload/img", (ctx) => {
    upload.upload(ctx, "img");
});

/**
 * 上传视频
 */
router.post("/upload/video", (ctx) => {
    upload.upload(ctx, "video");
});

/**
 * 上传文件
 */
router.post("/upload/file", (ctx) => {
    upload.upload(ctx, "file");
});

/**
 * 搜索
 */
router.get("/IL09api/search/:value", (ctx) => {
    if (ctx.params.value === "newbee") {
        ctx.response.body = [
            {
                type: '课程',
                items: [
                    {value: 'webpack学习', url: '#1'},
                    {value: 'vue学习', url: '#2'}
                ]
            },
            {
                type: '社区', items: [{value: 'webpack学习', url: '#3'}, {value: 'vue学习', url: '#4'}],
            }
        ];
    } else {
        ctx.response.body = 0;
    }
});

/**
 * 登录
 */
router.post("/IL09api/login", async (ctx) => {
    await apiGet.setLoginData(ctx, "users", ctx.request.body);
});

/**
 *注册
 */
router.post("/IL09api/sign", async (ctx) => {
    await apiGet.setSignData(ctx,"users",ctx.request.body);
});

/**
 *获取用户名和头像链接
 */
router.get("/IL09api/getAccount/:accountHashMap", async (ctx, next) => {
    await apiGet.getAll(ctx, next, "users", {
            attributes: ["account","avatarUrl"],
            where: {accountHashMap: ctx.params.accountHashMap}
        },
    );
});

/**
 * 获取评论
 */
router.get("/IL09api/getComments/:targetId", async (ctx, next) => {
    await comments.getComments(ctx, next);
});

/**
 * 添加评论
 */
router.post("/IL09api/addComments", async (ctx, next) => {
    await comments.addComments(ctx,next);
});

/**
 * 添加支持者
 */
router.post("/IL09api/addSupporter", async (ctx, next) => {
    await comments.addSupporter(ctx,next);
});

/**
 * 删除支持者
 */
router.delete("/IL09api/deleteSupporter/:commentsId", async (ctx, next) => {
    await comments.deleteSupporter(ctx,next);
});
module.exports = router;
