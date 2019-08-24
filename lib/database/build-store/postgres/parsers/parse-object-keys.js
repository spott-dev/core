const {isPlainObject, isArray} = require('lodash');

function parseObjectKeys(obj, parser) {
  const parseValue = (value) => {
    if (isArray(value)) return parseArray(value);
    if (isPlainObject(value)) return parseObject(value);
    return value;
  };

  const parseArray = (array) => {
    return array.map(item => {
      if (isPlainObject(item)) return parseObject(item);
      return item;
    });
  };

  const parseObject = (item) => {
    return Object.keys(item).reduce((result, key) => {
      const parsedValue = parseValue(item[key]);
      const parsedKey = parser(key);
      return {
        ...result,
        [parsedKey]: parsedValue
      };
    }, {});
  };

  return parseValue(obj);
}

module.exports = parseObjectKeys;
