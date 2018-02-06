const db = require('../db');

module.exports = db.defineModel('users', {
    account: db.STRING(50),
    name: db.STRING(50),
    nickName: db.STRING(50),
    position: db.STRING(50),
    eMail: db.STRING(50),
});
