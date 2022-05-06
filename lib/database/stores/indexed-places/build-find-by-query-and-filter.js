const {get, uniq, isFinite, isArray} = require('lodash');

const NOT_FOUND_ERROR = 404;
const NAMES_FIELDS = [
  'names',
  'adminDivision2.names',
  'adminDivision1.names',
  'country.names'
];

function buildSimpleMatchQuery(query) {
  return {
    match: {
      names: {
        query,
        zero_terms_query: 'all'
      }
    }
  };
}

function buildMatchMostWordsQuery(query) {
  return {
    multi_match: {
      query,
      fields: NAMES_FIELDS,
      type: 'cross_fields',
      operator: 'and',
      tie_breaker: 1.0,
      zero_terms_query: 'all'
    }
  };
}

function buildMatchMostFieldsQuery(query) {
  return {
    multi_match: {
      query,
      fields: NAMES_FIELDS,
      analyzer: 'simple',
      type: 'most_fields',
      minimum_should_match: 1,
      fuzziness: 'AUTO',
      prefix_length: 1,
      zero_terms_query: 'all'
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

  return (queryRaw, filter = {}, options = {}) => {
    const {limit, skip, fields} = options;
    const query = queryRaw || '';

    const searchQuery = {
      query: {
        bool: {
          must: [
            buildSimpleMatchQuery(query),
            buildMatchMostWordsQuery(query),
            buildMatchMostFieldsQuery(query),
            buildHigherPopulationQuery()
          ],
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
        if (error.statusCode === NOT_FOUND_ERROR) return null;
        return Promise.reject(error);
      });
  };
}

function parseResponse(data) {
  const objs = get(data, 'hits.hits');
  return objs.map(obj => ({...get(obj, '_source'), score: obj._score}));
}

module.exports = buildFindByQueryAndFilter;
