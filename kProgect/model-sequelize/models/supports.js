const db = require('../db');

module.exports = db.defineModel('supports', {
    commentsId:db.STRING(50),
    nickName:db.STRING(50),
});
