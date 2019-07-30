const u = require('shared/util/u.js');
const express = require('express');

const setupAuth = require('web_service/auth/auth.js');
const publicWebExpressRouter = require('web_service/public_web/public_web_express_router.js');
const privateApiExpressRouter = require('web_service/private_api/private_api_express_router.js');

const webServer = {
  _enableRoutes(app) {
    const {
      authenticate,
      authenticateWithRedirect,
      authenticationFork,
    } = setupAuth(publicWebExpressRouter);

    // arbitrate what GET / resolves to based on auth result
    app.get(
      '/',
      authenticationFork(
        (_, res) => res.sendFile('web_service/static/app.html', { root: '.' }),
        (_, res) =>
          res.sendFile('web_service/static/public.html', { root: '.' }),
      ),
    );

    app.use(publicWebExpressRouter);
    app.use(privateApiExpressRouter(authenticate, authenticateWithRedirect));
  },

  startWebServer(PORT_NUMBER = process.env.PORT || 3000) {
    const app = express();

    this._enableRoutes(app);

    app.listen(PORT_NUMBER, () =>
      u.log(`Web server started on port ${PORT_NUMBER}`),
    );
  },
};

webServer.startWebServer();
