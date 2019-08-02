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

/**
FUNCTION RECURSIVELY RESOLVES COMMENTS
*/
function getCommentsForJobAndCompany(jobId, companyId, parentId) {
  const commentSelectQuery =
    "SELECT " +
    "comment.* , " +
    "user.username " +
    "FROM waterloo_oasis_dev.comment as comment " +
    "LEFT JOIN waterloo_oasis_dev.user as user " +
    "ON comment.author_id = user.id " +
    "WHERE " +
    "comment.job_id = ? " +
    "AND comment.company_id = ? " +
    "AND comment.parent_id = ? " +
    "ORDER BY comment.date_time DESC;";

  pool.query(commentSelectQuery, [jobId, companyId, parentId], (commentErr, rows) => {
    if (commentErr) {
      return [];
    }

    const queryComments = [];

    rows.forEach(row => {

      const replies = getCommentsForJobAndCompany(jobId, companyId, row.id);

      const comment = {
        id : row.id,
        companyId : row.company_id,
        jobId : row.job_id,
        parentId : row.parent_id,
        author : row.username,
        dateTime : row.date_time,
        text : row.text
      };

      queryComments.push(row);

    });

    return {
      comments: queryComments;
    }
  });

}

module.exports = {
  query,
  pool,
  getCommentsForJobAndCompany,
};
