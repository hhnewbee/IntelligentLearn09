const db = require('../db');

module.exports = db.defineModel('posts', {
    theme:db.STRING(50),
    author:db.STRING(50),
    category:db.STRING(50),
    time:db.STRING(50),
    likes:db.INTEGER,
    replys:db.INTEGER,
    content: db.TEXT
});
