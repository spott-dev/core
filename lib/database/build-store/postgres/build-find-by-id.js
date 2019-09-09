function buildFindById(knex, params) {
  const {tableName, parseForDelivery, parseFields} = params;

  return async (id, options = {}) => {
    const {fields} = options;
    const selectArray = fields ? parseFields(fields) : ['*'];

    const result = await knex(tableName)
      .select(...selectArray)
      .where('id', id)
      .first() || null;

    return parseForDelivery(result);
  };
}

module.exports = buildFindById;
