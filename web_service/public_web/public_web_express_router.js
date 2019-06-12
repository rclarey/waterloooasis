const express = require("express");
const expressUtils = require("shared/util/expressUtils");
const pool = require('shared/util/db.js');
const bodyParser = require('body-parser');

const publicWebExpressRouter = (() => {
  const router = expressUtils.createRouter();

  router.use(express.static("web_service/static"));
  router.use(bodyParser.urlencoded());
  router.use(bodyParser.json());

  router.get("/*", (_, res) =>
    res.sendFile("web_service/static/index.html", { root: "." }),
  );

  /**
  FOR NOW PUT THIS HERE TO TEST EXTERNALLY
  */
  router.get('/api/users', (_, res) => {
    pool.query('SELECT * FROM waterloo_oasis_dev.user', function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    });
  });

  /**
  FOR NOW: Pass in username, rest will be set values
  */
  router.post('/api/users', (req, res) => {
    console.log(req.body);
    pool.query('SELECT * FROM waterloo_oasis_dev.user', function(err, rows, fields) {
      if (err) throw err;
      /* Manage your results here */

    });

  });

  return router;
})();

module.exports = publicWebExpressRouter;
