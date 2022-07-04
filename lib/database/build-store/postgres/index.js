const buildFindById = require('./build-find-by-id');
const buildUpsert = require('./build-upsert');

function buildPostgresStore(params) {
  const { postgres, postgresRead } = params;
  return {
    findById: buildFindById(postgresRead, params),
    upsert: buildUpsert(postgres, params)
  };
}

module.exports = buildPostgresStore;
