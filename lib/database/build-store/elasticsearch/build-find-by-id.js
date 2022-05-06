const NOT_FOUND_ERROR = 404;

function buildFindById(elasticsearch, params) {
  const {index, type, parseForDelivery} = params;

  return (id, options = {}) => {
    const {fields} = options;
    const indexParams = {
      id,
      index,
      type
    };

    if (fields) indexParams._source_includes = fields;

    return elasticsearch
      .get(indexParams)
      .then(parseResponse)
      .then(parseForDelivery)
      .catch(error => {
        if (error.statusCode === NOT_FOUND_ERROR) return null;
        return Promise.reject(error);
      });
  };
}

function parseResponse(data) {
  return data._source;
}

module.exports = buildFindById;
