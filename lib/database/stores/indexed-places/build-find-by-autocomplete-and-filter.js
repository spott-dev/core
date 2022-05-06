const {get, uniq, isFinite, isArray} = require('lodash');

const NOT_FOUND_ERROR = 404;
const NAMES_FIELDS = [
  'names',
  'adminDivision2.names',
  'adminDivision1.names',
  'country.names'
];
const NAMES_AUTOCOMPLETE_FIELDS = NAMES_FIELDS.reduce((result, name) => {
  return [
    ...result,
    `${name}.autocomplete`,
    `${name}.autocomplete._2gram`,
    `${name}.autocomplete._3gram`
  ];
}, []);

function buildExactMatchQuery(query) {
  return {
    multi_match: {
      query,
      fields: [
        'names.autocomplete',
        'names.autocomplete._2gram',
        'names.autocomplete._3gram'
      ],
      type: 'bool_prefix',
      fuzziness: 'AUTO',
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

function buildMatchPrefixQuery(query) {
  return {
    multi_match: {
      query,
      fields: NAMES_AUTOCOMPLETE_FIELDS,
      type: 'bool_prefix',
      fuzziness: 'AUTO'
    }
  };
}

function buildMatchAllWordsQueries(query) {
  if (!query) return [];
  return query.split(' ').map(word => buildMatchPrefixQuery(word));
}

function buildFindByAutocompleteAndFilter(elasticsearch, params) {
  const {index, type, parseForDelivery, buildFilter} = params;

  return (queryRaw, filter = {}, options = {}) => {
    const {limit, skip, fields} = options;
    const query = queryRaw || '';

    const searchQuery = {
      query: {
        bool: {
          must: [
            ...buildMatchAllWordsQueries(query),
            buildExactMatchQuery(query),
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

module.exports = buildFindByAutocompleteAndFilter;
