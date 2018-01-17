const db = require('../db');

module.exports = db.defineModel('comments', {
    theme:db.STRING(50),
    avatar:db.STRING(50),
    name:db.STRING(50),
    time:db.STRING(50),
    auto:db.BOOLEAN,
    likes:db.INTEGER,
    replys:db.INTEGER,
    content: db.TEXT
});
