const expressUtils = require('shared/util/expressUtils');
const mysql = require('mysql')
const pool = require('shared/util/db.js');

const privateApiExpressRouter = (() => {
  const router = expressUtils.createRouter();

  router.get('/api/users', (_, res) => {
    pool.query('SELECT * FROM waterloooasis', function(err, rows, fields) {
      if (err) throw err;
      /* Manage your results here */

    });

  });

  return router;
})();

module.exports = privateApiExpressRouter;
