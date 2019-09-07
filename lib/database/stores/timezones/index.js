const knex = require('../../engines/postgres');
const buildPostgresStore = require('../../build-store/postgres');
const {camelizeObject, snakeObject} = require('../../parsers');

const TABLE_NAME = 'geonames_timezones';
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

  return buildPostgresStore(knex, params);
}

module.exports = buildStore();
