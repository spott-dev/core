const knex = require('../../engines/postgres');
const buildGetAllGeonameIds = require('./build-get-all-geoname-ids');
const buildPostgresStore = require('../../build-store/postgres');
const {camelizeObject, snakeObject} = require('../../parsers');

const TABLE_NAME = 'geonames_places';
const CONFLICT_TARGETS = ['id'];
const UPDATED_AT_FIELD = 'updated_at';

function buildStore() {
  const params = {
    tableName: TABLE_NAME,
    conflictTargets: CONFLICT_TARGETS,
    updatedAtField: UPDATED_AT_FIELD,
    parseForStorage: snakeObject,
    parseForDelivery: camelizeObject
  };

  const store = buildPostgresStore(knex, params);
  const getAllGeonameIds = buildGetAllGeonameIds(knex, params);

  return {
    ...store,
    getAllGeonameIds
  };
}

module.exports = buildStore();
