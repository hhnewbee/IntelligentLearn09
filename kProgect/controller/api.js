const moduls=require('../model-sequelize/model');
const sha256=require('sha256');

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

/**
 * 添加数据并且成功返回1
 * @param ctx
 * @param next
 * @param tb
 * @param args
 * @returns {Promise.<void>}
 */
let addAll=async (ctx,next,tb,args) =>
{
    try {
        await moduls[tb].create(args);
        ctx.response.body=1;
    } catch (err) {
        console.log(err);
    }
};

/**
 * 登录处理
 * @param ctx
 * @param tb
 * @param args
 * @returns {Promise.<void>}
 */
let setLoginData=async (ctx,tb,args) =>{
    try {
        //获取返回值
        let passwd=await moduls[tb].findOne({
            attributes:['passwd'],
            where:{account:args.account}
        });
        //简化返回值并且密码对比
        if(passwd.get({plain:true}).passwd===args.passwd){
            //更新数据账户的映射
            await moduls[tb].update(
                {
                    accountHashMap: sha256(args.account)
                },
                {
                    where: {
                        account:args.account
                    }
                }
            );
            //返回账户的映射
            let module=await moduls[tb].findOne({
                attributes:['accountHashMap'],
                where:{account:args.account}
            });
            ctx.response.body=module.get({plain:true});
        }else{
            ctx.response.body=0;
        }
    } catch (err) {
        console.log(err);
    }
};

/**
 * 注册处理
 * @param ctx
 * @param tb
 * @param args
 * @returns {Promise.<void>}
 */
let setSignData=async (ctx,tb,args)=>{
    try {
        //先是创建数据
        await moduls[tb].create(args);
        //更新数据账户的映射
        await moduls[tb].update(
            {
                accountHashMap: sha256(args.account)
            },
            {
                where: {
                    account:args.account
                }
            }
        );
        //返回账户的映射
        let module=await moduls[tb].findOne({
            attributes:['accountHashMap'],
            where:{account:args.account}
        });
        ctx.response.body=module.get({plain:true});
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getAll,
    addAll,
    setSignData,
    setLoginData
};