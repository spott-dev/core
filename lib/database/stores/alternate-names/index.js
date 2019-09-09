const knex = require('../../engines/postgres');
const buildFindByGeonameIdAndLanguage = require('./build-find-by-geoname-id-and-language');
const buildPostgresStore = require('../../build-store/postgres');
const {camelizeObject, snakeObject, snakeArray} = require('../../parsers');

const TABLE_NAME = 'geonames_alternate_names';
const CONFLICT_TARGETS = ['id'];
const UPDATED_AT_FIELD = 'updated_at';

function buildStore() {
  const params = {
    tableName: TABLE_NAME,
    conflictTargets: CONFLICT_TARGETS,
    updatedAtField: UPDATED_AT_FIELD,
    parseForStorage: snakeObject,
    parseForDelivery: camelizeObject,
    parseFields: snakeArray
  };

  const store = buildPostgresStore(knex, params);
  const findByGeonameIdAndLanguage = buildFindByGeonameIdAndLanguage(knex, params);

  return {
    ...store,
    findByGeonameIdAndLanguage
  };
}

module.exports = buildStore();
