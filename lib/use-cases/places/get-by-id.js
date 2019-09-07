const populatePlace = require('./populate');

/**
 * Finds a place by id and populates it
 * @param {Object} params - Use case parameters
 * @param {Object} params.database - Database
 * @param {string} params.id - Place id to perform search
 * @param {string[]} [params.languages] - Languages to localize the name of the place
 */
async function getPlaceById({database, id, languages}) {
  const place = await database.places.findById(id);
  if (!place) return null;
  return populatePlace({database, place, languages});
}

module.exports = getPlaceById;
