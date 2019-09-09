const {snakeCase} = require('lodash');

function snakeArray(arr) {
  return arr.map(snakeCase);
}

module.exports = snakeArray;
