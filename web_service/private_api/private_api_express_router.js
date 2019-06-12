const expressUtils = require('shared/util/expressUtils');
const mysql = require('mysql')

const privateApiExpressRouter = (() => {
    const router = expressUtils.createRouter();

    router.get()

    return router;
})();

module.exports = privateApiExpressRouter;
