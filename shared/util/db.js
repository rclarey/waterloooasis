const mysql = require('mysql');
const config = require('config');

const dbConfig = config.get('Server.dbConfig');
const pool = mysql.createPool(dbConfig);

// A minimal promise wrapper over the query API for the sake of sanity
function query(queryString, args) {
  return new Promise((resolve, reject) => {
    if (args !== undefined) {
      pool.query(queryString, args, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    } else {
      pool.query(queryString, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }
  });
}

module.exports = {
  query,
  pool,
};
