var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password'
});

module.exports = pool;