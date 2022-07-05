const getCountriesData = require('./get-countries-data');
const getParentsData = require('./get-parents-data');
const populateAll = require('./populate-all');

/**
 * Populates a list of places to be populated
 * @param {Object} params - Use case parameters
 * @param {Object} params.database - Database
 * @param {Object[]} [params.places] - An array of place  to be populated
 * @param {string[]} [params.languages] - Languages to localize the name of the place
 */
async function populatePlaces({ database, places, languages }) {
  const countriesData = await getCountriesData({ database, places });
  const parentsData = await getParentsData({ database, places, languages });

  return populateAll({
    database,
    languages,
    places,
    countriesData,
    parentsData,
  });
}

module.exports = populatePlaces;
