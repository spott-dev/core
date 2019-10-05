const {elasticsearch} = require('../../engines');
const buildElasticsearchStore = require('../../build-store/elasticsearch');
const buildFindByAutocompleteAndFilter = require('./build-find-by-autocomplete-and-filter');
const buildFindByQueryAndFilter = require('./build-find-by-query-and-filter');
const buildFilter = require('./build-filter');
const parseForDelivery = require('./parse-for-delivery');

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
  const findByAutocompleteAndFilter = buildFindByAutocompleteAndFilter(elasticsearch, params);
  const findByQueryAndFilter = buildFindByQueryAndFilter(elasticsearch, params);

  return {
    ...store,
    findByAutocompleteAndFilter,
    findByQueryAndFilter
  };
}

function parseForStorage(data) {
  return { ...data };
}

module.exports = buildStore();
