const express = require("express");
const expressUtils = require("shared/util/expressUtils");

const publicWebExpressRouter = (() => {
  const router = expressUtils.createRouter();

  router.use(express.static("web_service/static"));
  router.get("/*", (_, res) =>
    res.sendFile("web_service/static/index.html", { root: "." }),
  );

  return router;
})();

module.exports = publicWebExpressRouter;
