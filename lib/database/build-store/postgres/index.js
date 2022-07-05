const buildFindAllBy = require('./build-find-all-by');
const buildFindById = require('./build-find-by-id');
const buildUpsert = require('./build-upsert');

function buildPostgresStore(params) {
  const { postgres, postgresRead } = params;
  const findAllBy = buildFindAllBy(postgresRead, params);
  return {
    findAllBy,
    findByIds: (ids, options) => findAllBy('id', ids, options),
    findById: buildFindById(postgresRead, params),
    upsert: buildUpsert(postgres, params)
  };
}

module.exports = buildPostgresStore;
