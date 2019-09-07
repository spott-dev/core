function buildFindById(knex, params) {
  const {tableName, parseForDelivery} = params;

  return async (id) => {
    const result = await knex(tableName)
      .where('id', id)
      .first() || null;

    return parseForDelivery(result);
  };
}

module.exports = buildFindById;
