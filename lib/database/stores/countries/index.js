const {omit} = require('lodash');
const knex = require('../../engines/postgres');
const buildPostgresStore = require('../../build-store/postgres');
const buildFindByGeonameId = require('./build-find-by-geoname-id');
const {camelizeObject, snakeObject} = require('../../parsers');

const TABLE_NAME = 'geonames_countries';
const CONFLICT_TARGETS = ['geoname_id'];
const UPDATED_AT_FIELD = 'updated_at';

function buildStore() {
  const params = {
    tableName: TABLE_NAME,
    conflictTargets: CONFLICT_TARGETS,
    updatedAtField: UPDATED_AT_FIELD,
    parseForStorage: snakeObject,
    parseForDelivery: camelizeObject
  };

  const store = omit(
    buildPostgresStore(knex, params),
    ['findById']
  );
  const findByGeonameId = buildFindByGeonameId(knex, params);

  return {
    ...store,
    findByGeonameId
  };
}

module.exports = buildStore();
