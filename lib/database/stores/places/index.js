const knex = require('../../engines/postgres');
const buildPostgresStore = require('../../build-store/postgres');

const TABLE_NAME = 'places';
const CONFLICT_TARGETS = ['id'];

function buildStore() {
  const params = {
    tableName: TABLE_NAME,
    conflictTargets: CONFLICT_TARGETS
  };
  return buildPostgresStore(knex, params);
}

module.exports = buildStore();
