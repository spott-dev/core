const {pick, compact} = require('lodash');
const populateIndexedPlace = require('./populate-indexed');

const FILTER_PARAMS = [
  'types',
  'countryIds',
  'adminDivision1Ids',
  'adminDivision2Ids',
  'coordinates'
];

const OPTIONS_PARAMS = [
  'skip',
  'limit'
];

const SEARCH_METHODS = {
  SIMPLE: 'SIMPLE',
  AUTOCOMPLETE: 'AUTOCOMPLETE'
};

/**
 * Finds the best places matching a query and populates them
 * @param {Object} params - Use case parameters
 * @param {Object} params.database - Database
 * @param {string} params.query - String to seach for matching places
 * @param {string} params.searchMethod - Type of search to get results. Valids are: SIMPLE and AUTOCOMPLETE
 * @param {string[]} [params.types] - A list place types (CITY, COUNTRY, ADMIN_DIVISION_1, ADMIN_DIVISION_2) to filter results
 * @param {string[]} [params.countryIds] - A list of country ids to filter results
 * @param {string[]} [params.adminDivision1Ids] - A list of adminDivision1 ids to filter results
 * @param {string[]} [params.adminDivision2Ids] - A list of adminDivision2 ids to filter results
 * @param {Object} params.coordinates - A location in Earth to filter places within the area
 * @param {number} params.coordinates.latitude - Latitude value of the coordinates set (min: -90.0, max: 90.0)
 * @param {number} params.coordinates.longitude - Longitude value of the coordinates set (min: -180.0, max: 180.0)
 * @param {number} params.coordinates.accuracyRadiusKm - Radius in KM of the area to search for places from latitude, longitude point (min: 0).
 * @param {number} params.limit - The maximum amount of elements to return
 * @param {number} params.skip - The amount of elements to skip before returning results
 * @param {string[]} [params.languages] - Languages to localize the name of the place
 */
function getPlacesByQuery(params) {
  const {database, searchMethod, query, languages} = params;

  const execute = async () => {
    const filter = pick(params, FILTER_PARAMS);
    const options = {
      ...pick(params, OPTIONS_PARAMS),
      fields: ['id', 'score']
    };
    const indexedPlaces = await findPlaces(filter, options);
    const promises = indexedPlaces.map(p => populateIndexedPlace({database, languages, indexedPlace: p}));
    const results = await Promise.all(promises);
    return compact(results);
  };

  const findPlaces = (filter, options) => {
    if (searchMethod === SEARCH_METHODS.SIMPLE) return database.indexedPlaces.findByQueryAndFilter(query, filter, options);
    if (searchMethod === SEARCH_METHODS.AUTOCOMPLETE) return database.indexedPlaces.findByAutocompleteAndFilter(query, filter, options);
    throw new Error(`Invalid searchMethod "${searchMethod}". Valids: ${Object.values(SEARCH_METHODS).join(', ')}`);
  };

  return execute();
}

module.exports = getPlacesByQuery;
