const { postgres, postgresRead } = require('../../engines');
const buildFindBy = require('./build-find-by');
const buildGetAllGeonameIds = require('./build-get-all-geoname-ids');
const buildPostgresStore = require('../../build-store/postgres');
const {camelizeObject, snakeObject, snakeArray} = require('../../parsers');

const TABLE_NAME = 'geonames_places';
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

  const store = buildPostgresStore(params);
  const findByCode = buildFindBy('code', postgresRead, params);
  const findByGeonameId = buildFindBy('geoname_id', postgresRead, params);
  const getAllGeonameIds = buildGetAllGeonameIds(postgresRead, params);
  const findByGeonameIds = (ids, options) => store.findAllBy('geoname_id', ids, options);

  return {
    ...store,
    findByCode,
    findByGeonameId,
    findByGeonameIds,
    getAllGeonameIds
  };
}

module.exports = buildStore();
