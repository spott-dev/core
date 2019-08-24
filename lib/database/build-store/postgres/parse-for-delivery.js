const {isObject, isArray, camelCase} = require('lodash');

function parseForDelivery(result) {
  if (!result) return null;
  return camelizeObject(result);
}

function camelizeObject(fixture) {
  return Object.keys(fixture).reduce((result, key) => {
    const parsedValue = camelizeValue(fixture[key]);
    const parsedKey = camelCase(key);
    return {
      ...result,
      [parsedKey]: parsedValue
    };
  }, {});
}

function camelizeValue(currentValue) {
  if (isObject(currentValue)) return camelizeObject(currentValue);
  if (isArray(currentValue)) return currentValue.map(item => {
    if (isObject(item)) return camelizeObject(item);
    return item;
  });
  return currentValue;
}

module.exports = parseForDelivery;
