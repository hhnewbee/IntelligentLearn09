const Router = require('koa-router');
//前端接口
const apiGet = require('./controller/api');
let router = new Router();

router.get("/IL09api/getComments/:theme", async (ctx, next) => {
    let pageIndex =ctx.request.query.pageIndex;
    await apiGet.getAll(ctx, next, "comments", {
            attributes: ["avatar","name","time","auto","likes","replys","content"],
            offset: pageIndex===1?0:(pageIndex-1)*10,
            limit: pageIndex*10 ,
            order: [
                [
                    'time','DESC'
                ]
            ],
            where: {theme: ctx.params.theme}
        },
    );
});

router.post("/IL09api/addComments/:theme", async (ctx, next) => {
    let body=Object.assign(ctx.request.body,{title:ctx.params.title},{add_time:Date()});
    await apiGet.addAll(ctx, next, "comments",body);
});

module.exports = router;
