const model = require('./model');

/**
 * 添加图文分享
 */
function addImgs() {
    let news = model.imgs;
    [
        {
            title: '这是一个新闻1',
            img_url: 'http://localhost:3100/img/newsList/1.jpg',
            describe: '《你好，旧时光》是根据八月长安同名小说改编的青春校园网络剧，由沙漠执导，李兰迪、张新成、李牵、周澄奥、许梦圆、曹恩齐、汤梦佳、赵健雷、陈鹏万里等联袂主演[1]  。\n' +
            '该剧讲述了余周周、林杨和他们身边的小伙伴们在振华高中里经历种种喜怒哀乐并共同成长的青春故事[2]  ，于2017年11月8日在爱奇艺首播[3]  。',
            categoryId: '1',
            click: '0',
            add_time: Date()

        },
        {
            title: '这是一个新闻2',
            img_url: 'http://localhost:3100/img/newsList/2.jpg',
            describe: '《你好，旧时光》是根据八月长安同名小说改编的青春校园网络剧，由沙漠执导，李兰迪、张新成、李牵、周澄奥、许梦圆、曹恩齐、汤梦佳、赵健雷、陈鹏万里等联袂主演[1]  。\n' +
            '该剧讲述了余周周、林杨和他们身边的小伙伴们在振华高中里经历种种喜怒哀乐并共同成长的青春故事[2]  ，于2017年11月8日在爱奇艺首播[3]  。',
            categoryId: '2',
            click: '0',
            add_time: Date()
        },
        {
            title: '这是一个新闻3',
            img_url: 'http://localhost:3100/img/newsList/3.jpg',
            describe: '《你好，旧时光》是根据八月长安同名小说改编的青春校园网络剧，由沙漠执导，李兰迪、张新成、李牵、周澄奥、许梦圆、曹恩齐、汤梦佳、赵健雷、陈鹏万里等联袂主演[1]  。\n' +
            '该剧讲述了余周周、林杨和他们身边的小伙伴们在振华高中里经历种种喜怒哀乐并共同成长的青春故事[2]  ，于2017年11月8日在爱奇艺首播[3]  。',
            categoryId: '3',
            click: '0',
            add_time: Date()
        }
    ].forEach(async el => {
        try {
            await news.create(el);
        } catch (err) {
            console.log(err);
        }
    });
}

/**
 * 添加评论
 */
function addComments() {
    //获取模型对象的实例
    let news = model.comments;
    [
        {
            theme: '主题1',
            avatar:'http://localhost:3100/img/avater/avatar.jpg',
            name: 'newnew1',
            time: Date(),
            auto: 1,
            likes:10,
            replys:3,
            content: '《你好，旧时光》是根据八月长安同名小说改编的青春校园网络剧，由沙漠执导，李兰迪、张新成、李牵、周澄奥、许梦圆、曹恩齐、汤梦佳、赵健雷、陈鹏万里等联袂主演[1]  。\n' +
            '该剧讲述了余周周、林杨和他们身边的小伙伴们在振华高中里经历种种喜怒哀乐并共同成长的青春故事[2]  ，于2017年11月8日在爱奇艺首播[3]  。',
        },
        {
            theme: '主题1',
            avatar:'http://localhost:3100/img/avater/avatar.jpg',
            name: 'newnew2',
            time: Date(),
            auto: 0,
            likes:10,
            replys:12,
            content: '《你好，旧时光》是根据八月长安同名小说改编的青春校园网络剧，由沙漠执导，李兰迪、张新成、李牵、周澄奥、许梦圆、曹恩齐、汤梦佳、赵健雷、陈鹏万里等联袂主演[1]  。\n' +
            '该剧讲述了余周周、林杨和他们身边的小伙伴们在振华高中里经历种种喜怒哀乐并共同成长的青春故事[2]  ，于2017年11月8日在爱奇艺首播[3]  。',
        },
        {
            theme: '主题1',
            avatar:'http://localhost:3100/img/avater/avatar.jpg',
            name: 'newnew3',
            time: Date(),
            auto: 1,
            likes:10,
            replys:6,
            content: '《你好，旧时光》是根据八月长安同名小说改编的青春校园网络剧，由沙漠执导，李兰迪、张新成、李牵、周澄奥、许梦圆、曹恩齐、汤梦佳、赵健雷、陈鹏万里等联袂主演[1]  。\n' +
            '该剧讲述了余周周、林杨和他们身边的小伙伴们在振华高中里经历种种喜怒哀乐并共同成长的青春故事[2]  ，于2017年11月8日在爱奇艺首播[3]  。',
        },

    ].forEach(async el => {
        try {
            await news.create(el);
        } catch (err) {
            console.log(err);
        }
    });
}

addComments();