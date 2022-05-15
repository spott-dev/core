function buildFindBy(column, knex, params) {
  const {tableName, parseForDelivery, parseFields} = params;

  return async (value, options = {}) => {
    const {fields} = options;
    const selectArray = fields ? parseFields(fields) : ['*'];

    const results = await knex(tableName)
      .select(...selectArray)
      .where(column, value)
      .first() || null;

    return parseForDelivery(results);
  };
}

module.exports = buildFindBy;
