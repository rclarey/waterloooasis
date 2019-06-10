const express = require('express');
const expressUtils = require('shared/util/expressUtils');

const publicWebExpressRouter = (() => {
    const router = expressUtils.createRouter();

    router.use(express.static('web_service/static'));

    return router;
})();

module.exports = publicWebExpressRouter;
