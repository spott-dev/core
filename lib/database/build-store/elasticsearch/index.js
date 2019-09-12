const buildFindById = require('./build-find-by-id');
const buildUpsert = require('./build-upsert');

function buildElasticsearchStore(elasticsearch, params) {
  return {
    findById: buildFindById(elasticsearch, params),
    upsert: buildUpsert(elasticsearch, params)
  };
}

module.exports = buildElasticsearchStore;
