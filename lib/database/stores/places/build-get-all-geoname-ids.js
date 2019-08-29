const GEONAME_ID_COLUMN = 'geoname_id';

function buildGetAllGeonameIds(knex, params) {
  const {tableName} = params;

  return async () => {
    const results = await knex(tableName)
      .distinct(GEONAME_ID_COLUMN);

    return getValues(results);
  };
}

function getValues(results) {
  return results.map(r => r[GEONAME_ID_COLUMN]);
}

module.exports = buildGetAllGeonameIds;
