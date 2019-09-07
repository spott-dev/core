const GEONAME_ID_COLUMN = 'geoname_id';

function buildFindByGeonameId(knex, params) {
  const {tableName, parseForDelivery} = params;

  return async (geonameId) => {
    const results = await knex(tableName)
      .where(GEONAME_ID_COLUMN, geonameId)
      .first() || null;

    return parseForDelivery(results);
  };
}

module.exports = buildFindByGeonameId;
