const { omit } = require('lodash');
const { postgres, postgresRead } = require('../../engines');
const buildPostgresStore = require('../../build-store/postgres');
const buildFindByGeonameId = require('./build-find-by-geoname-id');
const { camelizeObject, snakeObject, snakeArray } = require('../../parsers');

const TABLE_NAME = 'geonames_countries';
const CONFLICT_TARGETS = ['geoname_id'];
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

  const store = omit(
    buildPostgresStore(params),
    ['findById']
  );
  const findByGeonameId = buildFindByGeonameId(postgresRead, params);

  return {
    ...store,
    findByGeonameId
  };
}

module.exports = buildStore();
