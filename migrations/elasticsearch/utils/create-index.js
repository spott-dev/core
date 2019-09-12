function createIndex({elasticsearch, index, mapping}) {
  const execute = async () => {
    await ensureIndex();
    await updateMapping();
  };

  const ensureIndex = () => {
    const handleExists = response => response.body ? null : createIndex();
    const params = { index };
    return elasticsearch.indices.exists(params).then(handleExists);
  };

  const createIndex = () => {
    const params = { index };
    return elasticsearch.indices.create(params);
  };

  const updateMapping = () => {
    return elasticsearch.indices.putMapping({
      index,
      body: mapping
    });
  };

  return execute();
}

module.exports = createIndex;
