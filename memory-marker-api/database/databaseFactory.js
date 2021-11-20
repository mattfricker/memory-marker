console.log(`environment:: ${process.env.NODE_ENV}`);
if(process.env.NODE_ENV == 'test') {
    db = require('./inMemDatabase');
} else {
    db = require('./postgres');
}

module.exports = db;
