const moduls=require('../model-sequelize/model');

/**
 *获取数组数据
 * @param ctx - web上下文
 * @param next - 下个中间插件
 * @param tb - 哪个表
 * @param args - 查找的元素
 * @returns {Promise.<void>}
 */
let getAll = async (ctx,next,tb,args) => {
    try{
        ctx.response.body=await moduls[tb].findAll(args);
    }catch(err){
        console.log(err);
    }
};

let addAll=async (ctx,next,tb,args) =>
{
    try {
        await moduls[tb].create(args);
        ctx.response.body='1';
    } catch (err) {
        console.log(err);
    }
};
module.exports = {
    getAll,
    addAll
};