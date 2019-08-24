const parseForDelivery = require('./parse-for-delivery');

function buildFindById(knex, params) {
  const {tableName} = params;

  return async (id) => {
    const result = await knex(tableName)
      .where('id', id)
      .first();

    return parseForDelivery(result);
  };
}

module.exports = buildFindById;
