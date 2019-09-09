const GEONAME_ID_COLUMN = 'geoname_id';

function buildFindByGeonameIdAndLanguage(knex, params) {
  const {tableName, parseForDelivery, parseFields} = params;

  return async (geonameId, options = {}) => {
    const {fields} = options;
    const selectArray = fields ? parseFields(fields) : ['*'];

    const results = await knex(tableName)
      .select(...selectArray)
      .where(GEONAME_ID_COLUMN, geonameId)
      .first() || null;

    return parseForDelivery(results);
  };
}

module.exports = buildFindByGeonameIdAndLanguage;
