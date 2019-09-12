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

    if (fields) indexParams._sourceIncludes = fields;

    return elasticsearch
      .get(indexParams)
      .then(parseForDelivery)
      .catch(error => {
        if (error.statusCode === NOT_FOUND_ERROR) return null;
        return Promise.reject(error);
      });
  };
}

module.exports = buildFindById;
