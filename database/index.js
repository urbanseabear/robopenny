const mongoose = require('mongoose');
const { user, password } = require('./dbconfig.js');

const db = mongoose.connect(
  `mongodb://${user}:${password}@localhost:27017/ffxiv?authSource=admin`,
  { promiseLibrary: global.Promise }
);

module.exports = db;