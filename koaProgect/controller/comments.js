const moduls = require('../model-sequelize/model');
/**
 * 获取评论
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
let getComments = async (ctx, next) => {
    try {
        //获取的次数
        let pageIndex = ctx.request.query.pageIndex;
        let position = {
            attributes: ["id", "nickName", "tag", "time", "content"],
            //每次获取十个
            offset: pageIndex * 10,
            limit: (pageIndex + 1) * 10,
            order: [
                [
                    'time', 'DESC'
                ]
            ],
            where: {targetId: ctx.params.targetId}
        };
        //获取所有的评论
        let themeModules = await moduls['comments'].findAll(position);
        //获取module中的值
        let themeDatas = themeModules.map((modules) => {
            return modules.dataValues;
        });
        for (let i = 0; i < themeDatas.length; i++) {
            //获取用户头像
            let avataUrlModule = await moduls['users'].findOne(
                {
                    attributes: ['avatarUrl'],
                    where: {account: themeDatas[i].nickName}
                }
            );
            themeDatas[i].avatarUrl = avataUrlModule.dataValues.avatarUrl;
            //获取每个评论的回复数
            themeDatas[i].replys = await moduls['comments'].count(
                {
                    where: {targetId: themeDatas[i].id}
                }
            );
            //获取每个评论的点赞数
            themeDatas[i].supports = await moduls['supports'].count(
                {
                    where: {commentsId: themeDatas[i].id}
                }
            );
        }
        ctx.response.body = themeDatas
    } catch (err) {
        console.log(err);
    }
};

/**
 * 添加评论
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
let addComments = async (ctx, next) => {
    try {
        await moduls['comments'].create(ctx.request.body);
        ctx.response.body = 1;
    } catch (err) {
        console.log(err);
    }
};

/**
 * 添加支持者
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
let addSupporter = async (ctx, next) => {
    try {
        await moduls['supports'].create(ctx.request.body);
        ctx.response.body = 1;
    } catch (err) {
        console.log(err);
    }
};

/**
 * 删除支持者
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
let deleteSupporter = async (ctx, next) => {
    try {
        await moduls['supports'].destroy({
            where:{commentsId:ctx.params.commentsId}
        });
        ctx.response.body = 1;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getComments,
    addComments,
    addSupporter,
    deleteSupporter
};