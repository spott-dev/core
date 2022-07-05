const { keyBy, uniq } = require('lodash');
const populatePlaces = require('./populate-places');

/**
 * Populates a list of indexedPlaces with full information
 * @param {Object} params - Use case parameters
 * @param {Object} params.database - Database
 * @param {Object[]} [params.indexedPlaces] - An array of indexedPlace objects to be populated
 * @param {string[]} [params.languages] - Languages to localize the name of the place
 */
function populateIndexedPlaces({database, indexedPlaces, languages}) {
  const ids = uniq(indexedPlaces.map((place) => place.id));

  const execute = async () => {
    const places = await database.places.findByIds(ids);
    const populatedPlaces = await populatePlaces({ database, languages, places });
    const placesById = keyBy(populatedPlaces, 'id');

    return indexedPlaces
      .map(({ id, score }) => {
        const populated = placesById[id];
        if (!populated) return null;
        return { ...populated, score };
      })
      .filter((e) => !!e);
  };

  return execute();
}

module.exports = populateIndexedPlaces;
