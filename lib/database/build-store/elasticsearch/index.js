const buildFindById = require('./build-find-by-id');
const buildUpsertMultiple = require('./build-upsert-multiple');
const buildUpsert = require('./build-upsert');

function buildElasticsearchStore(elasticsearch, params) {
  return {
    findById: buildFindById(elasticsearch, params),
    upsertMultiple: buildUpsertMultiple(elasticsearch, params),
    upsert: buildUpsert(elasticsearch, params)
  };
}

module.exports = buildElasticsearchStore;
