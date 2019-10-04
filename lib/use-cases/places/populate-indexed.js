const populatePlace = require('./populate');

/**
 * Populates an indexedPlace with full information
 * @param {Object} params - Use case parameters
 * @param {Object} params.database - Database
 * @param {Object} params.indexedPlace - IndexedPlace object to be populated
 * @param {string[]} [params.languages] - Languages to localize the name of the place
 */
function populateIndexedPlace({database, indexedPlace, languages}) {
  const {id, score} = indexedPlace;

  const execute = async () => {
    const place = await database.places.findById(id);

    if (!place) return null;

    const populatedPlace = await populatePlace({database, place, languages});

    return {
      ...populatedPlace,
      score
    };
  };

  return execute();
}

module.exports = populateIndexedPlace;
