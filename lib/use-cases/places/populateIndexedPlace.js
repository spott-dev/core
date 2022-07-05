const populateIndexedPlaces = require('./populate-indexed-places');

/**
 * Populates a Place with full information
 * @param {Object} params - Use case parameters
 * @param {Object} params.database - Database
 * @param {Object[]} params.place - A Place object to be populated
 * @param {string[]} [params.languages] - Languages to localize the name of the place
 */
const populateIndexedPlace = async ({ database, languages, indexedPlace }) => {
  const [ populated ] = await populateIndexedPlaces({ database, languages, indexedPlaces: [indexedPlace] });
  return populated || null;
}

module.exports = populateIndexedPlace;
