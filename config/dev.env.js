"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKEND_URL: '"http://172.16.1.182:8081"',
  BACKEND_SOCKET_URL: '"http://172.16.1.182:8082"'
});
