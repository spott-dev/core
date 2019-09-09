const {camelCase} = require('lodash');
const parseObjectKeys = require('./parse-object-keys');

function camelizeObject(obj) {
  return parseObjectKeys(obj, camelCase);
}

module.exports = camelizeObject;
