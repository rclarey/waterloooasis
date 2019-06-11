const lodash = require('lodash');

const u = {
  ...lodash,
  log: console.log, // eslint-disable-line no-console
};

module.exports = u;
