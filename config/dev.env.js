'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKEND_URL: '"http://192.168.109.192:8081"',
  BACKEND_SOCKET_URL: '"http://192.168.109.192:8082"'
})
