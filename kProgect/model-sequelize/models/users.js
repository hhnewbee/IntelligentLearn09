const db = require('../db');

module.exports = db.defineModel('users', {
    account: db.STRING(50),
    accountHashMap:{
        type: db.STRING(100),
        allowNull: true,
    },
    passwd:db.STRING(100),
    avatarUrl:{
        type: db.STRING(100),
        defaultValue: 'http://localhost:3100/img/avatar/avatar.jpg'
    },
    name: db.STRING(50),
    areaFocus: db.STRING(50),
    eMail: db.STRING(50),
    status:{
        type: db.BOOLEAN,
        defaultValue: true
    },
    permission:{
        type: db.STRING(50),
        defaultValue: '普通用户'
    }
});
