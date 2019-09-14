const {get, head} = require('lodash');

const NOT_FOUND_ERROR = 404;

function buildFindByNameAndFilter(elasticsearch, params) {
  const {index, type, parseForDelivery, buildFilter} = params;

  return (name, filter) => {
    const matchNameQuery = { match: { names: name } };

    const defaultFunctionScore = {
      filter: { match_all: {} },
      weight: 2
    };

    const populationFunctionScore = {
      field_value_factor: {
        field: 'population',
        modifier: 'sqrt',
        factor: 0.0001,
        missing: 1
      },
      weight: 1
    };

    const searchQuery = {
      query: {
        bool: {
          must: {
            function_score: {
              query: matchNameQuery,
              functions: [defaultFunctionScore, populationFunctionScore],
              score_mode: 'multiply'
            }
          },
          filter: buildFilter(filter)
        }
      }
    };

    const searchParams = {
      index,
      type,
      body: searchQuery,
      size: 1
    };

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
  const obj = head(get(data, 'body.hits.hits'));
  return get(obj, '_source') || null;
}

module.exports = buildFindByNameAndFilter;
