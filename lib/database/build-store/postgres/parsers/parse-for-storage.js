const {snakeCase} = require('lodash');
const parseObjectKeys = require('./parse-object-keys');

function parseForStorage(obj) {
  return parseObjectKeys(obj, snakeCase);
}

module.exports = parseForStorage;
