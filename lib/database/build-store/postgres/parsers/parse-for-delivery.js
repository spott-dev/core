const {camelCase} = require('lodash');
const parseObjectKeys = require('./parse-object-keys');

function parseForDelivery(obj) {
  return parseObjectKeys(obj, camelCase);
}

module.exports = parseForDelivery;
