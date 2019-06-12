const u = require('shared/util/u');
const express = require('express');

const publicWebExpressRouter = require('web_service/public_web/public_web_express_router');
const privateApiExpressRouter = require('web_service/private_api/private_api_express_router');

const webServer = {
    _enableRoutes(app) {
        app.use('/v:apiVersion([0-9]+.[0-9]+)', privateApiExpressRouter);
        app.use(publicWebExpressRouter);
    },

    startWebServer(PORT_NUMBER = process.env.PORT || 3000) {
        const app = express();

        this._enableRoutes(app);

        app.listen(PORT_NUMBER, () => u.log(`Web server started on port ${PORT_NUMBER}`));
    },
};

webServer.startWebServer();
