const db = require('../db');

module.exports = db.defineModel('comments', {
    targetId:db.STRING(50),
    nickName:db.STRING(50),
    time:db.STRING(50),
    tag:{
        type: db.STRING(50),
        defaultValue: '普通用户'
    },
    content: db.TEXT
});
