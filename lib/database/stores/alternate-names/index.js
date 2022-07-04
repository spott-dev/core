const { postgres, postgresRead } = require('../../engines');
const buildFindByGeonameIdAndLanguage = require('./build-find-by-geoname-id-and-language');
const buildFindByGeonameId = require('./build-find-by-geoname-id');
const buildPostgresStore = require('../../build-store/postgres');
const {camelizeObject, snakeObject, snakeArray} = require('../../parsers');

const TABLE_NAME = 'geonames_alternate_names';
const CONFLICT_TARGETS = ['id'];
const UPDATED_AT_FIELD = 'updated_at';

function buildStore() {
  const params = {
    postgres,
    postgresRead,
    tableName: TABLE_NAME,
    conflictTargets: CONFLICT_TARGETS,
    updatedAtField: UPDATED_AT_FIELD,
    parseForStorage: snakeObject,
    parseForDelivery: camelizeObject,
    parseFields: snakeArray
  };

  const store = buildPostgresStore(params);
  const findByGeonameIdAndLanguage = buildFindByGeonameIdAndLanguage(postgresRead, params);
  const findByGeonameId = buildFindByGeonameId(postgresRead, params);

  return {
    ...store,
    findByGeonameIdAndLanguage,
    findByGeonameId
  };
}

module.exports = buildStore();
