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
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
  if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }

  return 'just now';
}

module.exports = {
  pool,
  query,
  timeString,
};
