const knex = require('../../engines/postgres');
const buildFindByGeonameId = require('./build-find-by-geoname-id');
const buildGetAllGeonameIds = require('./build-get-all-geoname-ids');
const buildPostgresStore = require('../../build-store/postgres');
const {camelizeObject, snakeObject, snakeArray} = require('../../parsers');

const TABLE_NAME = 'geonames_places';
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
  const findByGeonameId = buildFindByGeonameId(knex, params);
  const getAllGeonameIds = buildGetAllGeonameIds(knex, params);

  return {
    ...store,
    findByGeonameId,
    getAllGeonameIds
  };
}

module.exports = buildStore();
