const db = require('../db');

module.exports = db.defineModel('replys', {
    commentsId:db.STRING(50),
    replyId:db.STRING(50),
});
