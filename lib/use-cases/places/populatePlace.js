const populatePlaces = require('./populate-places');

/**
 * Populates a Place with full information
 * @param {Object} params - Use case parameters
 * @param {Object} params.database - Database
 * @param {Object[]} params.place - A Place object to be populated
 * @param {string[]} [params.languages] - Languages to localize the name of the place
 */
const populatePlace = async ({ database, languages, place }) => {
  const [ populated ] = await populatePlaces({ database, languages, places: [place] });
  return populated || null;
};

module.exports = populatePlace;
