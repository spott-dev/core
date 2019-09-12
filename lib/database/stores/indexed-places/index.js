const {get} = require('lodash');
const {elasticsearch} = require('../../engines');
const buildElasticsearchStore = require('../../build-store/elasticsearch');

const COLLECTION = 'places';

function buildStore() {
  const index = elasticsearch.getIndex(COLLECTION);
  const params = {
    index,
    parseForStorage,
    parseForDelivery,
    updatedAtField: 'updatedAt'
  };

  return buildElasticsearchStore(elasticsearch, params);
}

function parseForDelivery(data) {
  const result = get(data, 'body._source');
  if (result.updatedAt) result.updatedAt = new Date(result.updatedAt);
  return result;
}

function parseForStorage(data) {
  return { ...data };
}

module.exports = buildStore();
