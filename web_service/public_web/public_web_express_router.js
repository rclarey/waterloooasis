const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');

const expressUtils = require('shared/util/expressUtils.js');

function servePublicPages(_, res) {
  res.sendFile('web_service/static/public.html', { root: '.' });
}

const publicWebExpressRouter = (() => {
  const router = expressUtils.createRouter();

  router.use(express.static('web_service/static'));
  router.use(bodyParser.urlencoded());
  router.use(bodyParser.json());
  router.use(cookieParser(process.env.COOKIE_SECRET));

  router.get('/signin', servePublicPages);
  router.get('/signup', servePublicPages);
  router.get('/verify', servePublicPages);

  return router;
})();

module.exports = publicWebExpressRouter;
