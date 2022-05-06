function buildUpsertMultiple(elasticsearch, params) {
  const {index, type, updatedAtField, parseForStorage} = params;

  return (items) => {
    const parsedItems = items.map(item => {
      const parsedItem = parseForStorage(item);
      if (updatedAtField) parsedItem[updatedAtField] = new Date();
      return parsedItem;
    });

    const operations = parsedItems.reduce((result, item) => {
      const ops = [
        {index: {_index: index, _type: type, _id: item.id}},
        item
      ];
      return result.concat(ops);
    }, []);

    const indexParams = {
      refresh: 'true',
      body: operations
    };

    return elasticsearch
      .bulk(indexParams)
      .then(parseForDelivery);
  };
}

function parseForDelivery(data = {}) {
  const success = data.errors === false;
  const upserted = (data.items || []).length;
  return { success, upserted };
}

module.exports = buildUpsertMultiple;
