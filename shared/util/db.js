var mysql = require('mysql');
var config = require('config');
const dbConfig = config.get('Server.dbConfig');

var pool  = mysql.createPool(dbConfig);

module.exports = pool;