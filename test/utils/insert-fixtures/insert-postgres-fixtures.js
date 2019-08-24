const {snakeCase} = require('lodash');
const knex = require('../../../lib/database/engines/postgres');
const {parseObjectKeys} = require('../../../lib/database/build-store/postgres/parsers');

function insertPostgresFixtures(fixtures, table) {
  const parsedFixtures = parseObjectKeys(fixtures, snakeCase);
  return knex(table).insert(parsedFixtures);
}

module.exports = insertPostgresFixtures;
