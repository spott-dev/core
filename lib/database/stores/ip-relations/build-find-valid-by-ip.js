const IP_COLUMN = 'ip';
const EXPIRES_AT_COLUMN = 'expires_at';

function buildFindByIp(knex, params) {
  const {tableName, parseForDelivery} = params;

  return async (ip) => {
    const results = await knex(tableName)
      .where(IP_COLUMN, ip)
      .andWhere(EXPIRES_AT_COLUMN, '>=', new Date())
      .first() || null;

    return parseForDelivery(results);
  };
}

module.exports = buildFindByIp;
