const GEONAME_ID_COLUMN = 'geoname_id';
const LANGUAGE_COLUMN = 'language';

function buildFindByGeonameIdAndLanguage(knex, params) {
  const {tableName, parseForDelivery} = params;

  return async (geonameId, language) => {
    const results = await knex(tableName)
      .where(GEONAME_ID_COLUMN, geonameId)
      .andWhere(LANGUAGE_COLUMN, language);

    return parseForDelivery(results);
  };
}

module.exports = buildFindByGeonameIdAndLanguage;
