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
  }).catch(() => {
    // TODO: log the original error when we get to logging errors
    return Promise.reject(
      new Error('Something went wrong on our end. Try again later.'),
    );
  });
}

function timeString(datetime) {
  const diff = Date.now() - new Date(datetime);
  const years = Math.floor(diff / 31536000000);
  const months = Math.floor(diff / 2592000000);
  const weeks = Math.floor(diff / 604800000);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor(diff / 60000);

  if (years > 0) {
    return `${years}y`;
  }
  if (months > 0) {
    return `${months}mo`;
  }
  if (weeks > 0) {
    return `${weeks}w`;
  }
  if (days > 0) {
    return `${days}d`;
  }
  if (hours > 0) {
    return `${hours}h`;
  }

  return `${minutes || 1}m`;
}

module.exports = {
  pool,
  query,
  timeString,
};
