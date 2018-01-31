const Router = require('koa-router');
//前端接口
const apiGet = require('./controller/api');
const upload = require('./controller/upload');
let router = new Router();

router.get("/IL09api/getComments/:theme", async (ctx, next) => {
    let pageIndex = ctx.request.query.pageIndex;
    await apiGet.getAll(ctx, next, "comments", {
            attributes: ["avatar", "name", "time", "auto", "likes", "replys", "content"],
            offset: pageIndex === 1 ? 0 : (pageIndex - 1) * 10,
            limit: pageIndex * 10,
            order: [
                [
                    'time', 'DESC'
                ]
            ],
            where: {theme: ctx.params.theme}
        },
    );
});

router.post("/IL09api/addComments/:theme", async (ctx, next) => {
    let body = Object.assign(ctx.request.body, {title: ctx.params.title}, {add_time: Date()});
    await apiGet.addAll(ctx, next, "comments", body);
});

router.post("/IL09api/posts", async (ctx, next) => {
    let body = Object.assign(ctx.request.body, {replys: '0'}, {likes: '0'});
    await apiGet.addAll(ctx, next, "posts", body);
});


router.post("/upload/img", (ctx) => {
    upload.upload(ctx, "img");
});

router.post("/upload/video", (ctx) => {
    upload.upload(ctx, "video");
});


router.post("/upload/file", (ctx) => {
    upload.upload(ctx, "file");
});

router.get("/IL09api/search/:value", (ctx) => {
    if (ctx.params.value === "newbee") {
        ctx.response.body = [
            {
                type: '课程', items: [{value: 'webpack学习', url: '#'}, {value: 'vue学习', url: '#'}]
            },
            {
                type: '社区', items: [{value: 'webpack学习', url: '#'}, {value: 'vue学习', url: '#'}],
            }
        ];
    } else {
        ctx.response.body = 0;
    }
});

router.post("/IL09api/login", (ctx) => {
    if (ctx.request.body.account==="131") {
        ctx.response.body =131;
    } else {
        ctx.response.body = 0;
    }
});

module.exports = router;
