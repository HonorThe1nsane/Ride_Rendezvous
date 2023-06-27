// Index to models
const dbConfig = require('../db/connect.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.car = require('./cars.js')(mongoose);
db.person = require('./person.js')(mongoose);

module.exports = db;