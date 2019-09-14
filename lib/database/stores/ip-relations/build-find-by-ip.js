const IP_COLUMN = 'ip';

function buildFindByIp(knex, params) {
  const {tableName, parseForDelivery} = params;

  return async (ip) => {
    const results = await knex(tableName)
      .where(IP_COLUMN, ip)
      .first() || null;

    return parseForDelivery(results);
  };
}

module.exports = buildFindByIp;
