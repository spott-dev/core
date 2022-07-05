function buildFindAllBy(knex, params) {
  const {tableName, parseForDelivery, parseFields} = params;

  return async (column, values, options = {}) => {
    const {fields} = options;
    const selectArray = fields ? parseFields(fields) : ['*'];

    const results = await knex(tableName)
      .select(...selectArray)
      .whereIn(column, values);

    return results.map(parseForDelivery);
  };
}

module.exports = buildFindAllBy;
