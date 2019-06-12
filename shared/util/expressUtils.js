const express = require('express');

const expressUtils = {
  createRouter() {
    return express.Router({
      caseSensitive: true,
      mergeParams: true,
    });
  },
};

module.exports = expressUtils;
