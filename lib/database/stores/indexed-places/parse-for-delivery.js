const {isArray} = require('lodash');

function parseForDelivery(source) {
  if (!source) return null;
  if (isArray(source)) return source.map(parseIndexedPlace);
  return parseIndexedPlace(source);
}

function parseIndexedPlace(source) {
  const result = { ...source };

  if (result.updatedAt) result.updatedAt = new Date(result.updatedAt);

  return result;
}

module.exports = parseForDelivery;
