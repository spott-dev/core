const knex = require('../../engines/postgres');
const buildPostgresStore = require('../../build-store/postgres');

const TABLE_NAME = 'places';
const CONFLICT_TARGETS = ['id'];
const UPDATED_AT_FIELD = 'updated_at';

function buildStore() {
  const params = {
    tableName: TABLE_NAME,
    conflictTargets: CONFLICT_TARGETS,
    updatedAtField: UPDATED_AT_FIELD
  };
  return buildPostgresStore(knex, params);
}

module.exports = buildStore();
