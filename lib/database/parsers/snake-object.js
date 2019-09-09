const {snakeCase} = require('lodash');
const parseObjectKeys = require('./parse-object-keys');

function snakeObject(obj) {
  return parseObjectKeys(obj, snakeCase);
}

module.exports = snakeObject;
