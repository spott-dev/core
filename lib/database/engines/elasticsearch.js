const assert = require('assert');
const Elasticsearch = require('@elastic/elasticsearch');
const {getElasticsearchConfig, getElasticsearchCollections} = require('../../../config');

const config = getElasticsearchConfig();
const elasticsearch = new Elasticsearch.Client(config);
const collections = getElasticsearchCollections();

elasticsearch.collections = collections;
elasticsearch.getIndex = (collection) => {
  const index = collections[collection];
  assert(index, `Index not found for collection "${collection}"`);
  return index;
};

module.exports = elasticsearch;
