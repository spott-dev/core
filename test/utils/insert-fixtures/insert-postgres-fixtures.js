const {isObject, isArray, snakeCase} = require('lodash');
const knex = require('../../../database/engines/postgres');

function insertPostgresFixtures(fixtures, table) {
  const parsedFixtures = fixtures.map(parseFixture);
  return knex(table).insert(parsedFixtures);
}

function parseFixture(fixture) {
  return Object.keys(fixture).reduce((result, key) => {
    const parsedValue = parseValue(fixture[key]);
    const parsedKey = snakeCase(key);
    return {
      ...result,
      [parsedKey]: parsedValue
    }
  }, {});
}

function parseValue(currentValue) {
  if (isObject(currentValue)) return parseFixture(currentValue);
  if (isArray(currentValue)) return currentValue.map(item => {
    if (isObject(item)) return parseFixture(item);
    return item;
  });
  return currentValue;
}

module.exports = insertPostgresFixtures;
