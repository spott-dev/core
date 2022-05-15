const knex = require('../../engines/postgres');
const buildFindBy = require('./build-find-by');
const buildGetAllGeonameIds = require('./build-get-all-geoname-ids');
const buildPostgresStore = require('../../build-store/postgres');
const {camelizeObject, snakeObject, snakeArray} = require('../../parsers');

const TABLE_NAME = 'geonames_places';
const CONFLICT_TARGETS = ['geoname_id'];
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
  const findByCode = buildFindBy('code', knex, params);
  const findByGeonameId = buildFindBy('geoname_id', knex, params);
  const getAllGeonameIds = buildGetAllGeonameIds(knex, params);

  return {
    ...store,
    findByCode,
    findByGeonameId,
    getAllGeonameIds
  };
}

module.exports = buildStore();
