const db = require('../db');

module.exports = db.defineModel('notifications', {
    account: db.STRING(50),
    name:db.STRING(50),
    type: db.STRING(50),
    chapter: db.STRING(50),
    uploader:db.STRING(50),
});
