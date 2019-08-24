const buildFindById = require('./build-find-by-id');

function buildPostgresStore(knex, params) {
  return {
    findById: buildFindById(knex, params)
  };
}

module.exports = buildPostgresStore;
