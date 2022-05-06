function buildUpsert(elasticsearch, params) {
  const {index, type, updatedAtField, parseForStorage, parseForDelivery} = params;

  return (item) => {
    const parsedItem = parseForStorage(item);
    const { id } = parsedItem;

    if (updatedAtField) parsedItem[updatedAtField] = new Date();

    const indexParams = {
      id,
      index,
      type,
      refresh: 'true',
      body: parsedItem
    };

    const getParams = {
      id,
      index,
      type
    };

    const returnItem = () => elasticsearch.get(getParams);

    return elasticsearch
      .index(indexParams)
      .then(returnItem)
      .then(parseResponse)
      .then(parseForDelivery);
  };
}

function parseResponse(data) {
  return data._source;
}

module.exports = buildUpsert;
