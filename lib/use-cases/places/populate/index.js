const getBasicInfo = require('./get-basic-info');
const getLocalizedNames = require('./get-localized-names');
const COUNTRY_TYPE = 'country';

const PARENTS_MAP = {
  CITY: ['country', 'adminDivision1', 'adminDivision2'],
  ADMIN_DIVISION_2: ['country', 'adminDivision1'],
  ADMIN_DIVISION_1: ['country'],
  COUNTRY: []
};

const IDS_MAP = {
  adminDivision1: 'adminDivision1Id',
  adminDivision2: 'adminDivision2Id',
  country: 'countryId'
};

/**
 * Populates a place with full information
 * @param {Object} params - Use case parameters
 * @param {Object} params.database - Database
 * @param {Object} params.place - Place object to be populated
 * @param {string[]} [params.languages] - Languages to localize the name of the place
 */
function populatePlace({database, place, languages}) {
  const {type, geonameId} = place;

  const execute = async () => {
    const countryProperties = await getCountryProperties();
    const localizedNames = await getLocalizedNames({database, geonameId, languages});
    const parents = await getParents();

    return {
      ...place,
      ...countryProperties,
      ...parents,
      localizedNames
    };
  };

  const getCountryProperties = () => {
    if (type !== COUNTRY_TYPE) return {};
    return database.countries.findByGeonameId(geonameId);
  };

  const getParents = () => {
    const parents = PARENTS_MAP[type];

    return parents.reduce(async (promise, parent) => {
      const result = await promise;
      const idKey = IDS_MAP[parent];
      const placeId = place[idKey];
      if (placeId) result[parent] = await getBasicInfo({database, placeId, languages});
      return result;
    }, Promise.resolve({}));
  };

  return execute();
}

module.exports = populatePlace;
