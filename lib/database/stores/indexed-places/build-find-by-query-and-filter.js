const {get, compact, uniq, isFinite, isArray} = require('lodash');

const NOT_FOUND_ERROR = 404;
const NAMES_FIELDS = [
  'names',
  'adminDivision2.names',
  'adminDivision1.names',
  'country.names'
];

function buildSimpleMatchQuery(query) {
  if (!query) return null;

  return {
    match: {
      names: { query }
    }
  };
}

function buildMatchMostWordsQuery(query) {
  if (!query) return null;

  return {
    multi_match: {
      query,
      fields: NAMES_FIELDS,
      type: 'cross_fields',
      operator: 'and',
      tie_breaker: 1.0
    }
  };
}

function buildMatchMostFieldsQuery(query) {
  if (!query) return null;

  return {
    multi_match: {
      query,
      fields: NAMES_FIELDS,
      analyzer: 'simple',
      type: 'most_fields',
      minimum_should_match: 1,
      fuzziness: 'AUTO',
      prefix_length: 1
    }
  };
}

function buildHigherPopulationQuery() {
  const matchAll = { match_all: {} };

  const populationFunctionScore = {
    field_value_factor: {
      field: 'population',
      modifier: 'log1p',
      missing: 0
    },
    weight: 1
  };

  return {
    function_score: {
      query: matchAll,
      functions: [populationFunctionScore],
      score_mode: 'avg'
    }
  };
}

function buildFindByQueryAndFilter(elasticsearch, params) {
  const {index, type, parseForDelivery, buildFilter} = params;

  return (query, filter = {}, options = {}) => {
    const {limit, skip, fields} = options;

    const must = compact([
      buildSimpleMatchQuery(query),
      buildMatchMostWordsQuery(query),
      buildMatchMostFieldsQuery(query),
      buildHigherPopulationQuery()
    ]);

    const searchQuery = {
      query: {
        bool: {
          must,
          filter: buildFilter(filter)
        }
      }
    };

    const searchParams = {
      index,
      type,
      body: searchQuery
    };

    if (isFinite(limit)) searchParams.size = limit;
    if (isFinite(skip)) searchParams.from = skip;
    if (isArray(fields)) searchParams._source = uniq(['id', ...fields]);

    return elasticsearch
      .search(searchParams)
      .then(parseResponse)
      .then(parseForDelivery)
      .catch(error => {
        console.log(error.meta.body);
        if (error.statusCode === NOT_FOUND_ERROR) return null;
        return Promise.reject(error);
      });
  };
}

function parseResponse(data) {
  const objs = get(data, 'body.hits.hits');
  return objs.map(obj => ({...get(obj, '_source'), score: obj._score}));
}

module.exports = buildFindByQueryAndFilter;
