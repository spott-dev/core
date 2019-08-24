const buildFindById = require('./build-find-by-id');
const buildUpsert = require('./build-upsert');

function buildPostgresStore(knex, params) {
  return {
    findById: buildFindById(knex, params),
    upsert: buildUpsert(knex, params)
  };
}

module.exports = buildPostgresStore;
