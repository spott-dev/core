const {elasticsearch} = require('../../engines');
const buildElasticsearchStore = require('../../build-store/elasticsearch');
const buildFindByNameAndFilter = require('./build-find-by-name-and-filter');
const buildFilter = require('./build-filter');

const COLLECTION = 'places';

function buildStore() {
  const index = elasticsearch.getIndex(COLLECTION);
  const params = {
    index,
    parseForStorage,
    parseForDelivery,
    buildFilter,
    updatedAtField: 'updatedAt'
  };

  const store = buildElasticsearchStore(elasticsearch, params);
  const findByNameAndFilter = buildFindByNameAndFilter(elasticsearch, params);

  return {
    ...store,
    findByNameAndFilter
  };
}

function parseForDelivery(source) {
  if (!source) return null;
  const result = { ...source };

  if (result.updatedAt) result.updatedAt = new Date(result.updatedAt);

  return result;
}

function parseForStorage(data) {
  return { ...data };
}

module.exports = buildStore();
