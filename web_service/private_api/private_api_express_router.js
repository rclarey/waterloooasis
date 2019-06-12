const expressUtils = require('shared/util/expressUtils');

const privateApiExpressRouter = (() => {
  const router = expressUtils.createRouter();

  return router;
})();

module.exports = privateApiExpressRouter;
