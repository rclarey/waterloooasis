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
    var select_query = "SELECT * FROM waterloo_oasis_dev.user"
    pool.query(select_query, function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    });
  });

  /**
  FOR NOW: Pass in username, rest will be set values
  */
  router.post('/api/users', (req, res) => {
    console.log(req.body);

    if (!("username" in req.body)) {
      res.sendStatus(400)
    }

    var insert_query = "INSERT INTO waterloo_oasis_dev.user (username, email, hash, salt, log_rounds) VALUES(?, 'email', 'hash', 'salt', 1);"
    pool.query(insert_query, [req.body.username], function(err, rows, fields) {
      if (err) {
        console.log(err)
        res.sendStatus(400);
      } else {
        /* Manage your results here */
        res.sendStatus(200)
      }
    });
  });

  return router;
})();

module.exports = publicWebExpressRouter;
