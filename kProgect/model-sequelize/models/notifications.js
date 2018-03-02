const db = require('../db');

module.exports = db.defineModel('notifications', {
    account: db.STRING(50),
    type: db.STRING(50),
    content: db.STRING(100),
    status:{
        type: db.BOOLEAN,
        defaultValue: false
    },
});
