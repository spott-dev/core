const chooseBestNane = require('./choose-best-name');

/**
 * Return the best name of a place given a geonameId and a language
 * @param {Object} params - Use case arameters
 * @param {Object} params.database - Database
 * @param {number} params.geonameId - geonameId of the place to find its name
 * @param {string} params.language - Language to find the name of the place
 */
async function getLocalizedName({database, geonameId, language}) {
  const alternateNames = await database.alternateNames.findByGeonameIdAndLanguage(geonameId, language);
  return chooseBestNane(alternateNames);
}

module.exports = getLocalizedName;
