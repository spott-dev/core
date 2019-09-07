const {getLocalizedName} = require('../alternate-names');
const COUNTRY_TYPE = 'country';

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
    const countryData = await getCountryData();
    const localizedNames = await getLocalizedNames();

    return {
      ...place,
      ...countryData,
      localizedNames
    };
  };

  const getCountryData = () => {
    if (type !== COUNTRY_TYPE) return {};
    return database.countries.findByGeonameId(geonameId);
  };

  const getLocalizedNames = () => {
    return (languages || []).reduce(async (promise, language) => {
      const result = await promise;
      const name = await getLocalizedName({database, geonameId, language});
      return Object.assign(result, {[language]: name});
    }, Promise.resolve({}));
  };

  return execute();
}

module.exports = populatePlace;
