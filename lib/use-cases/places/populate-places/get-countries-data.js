const { uniq } = require('lodash');

const COUNTRY_TYPE = 'COUNTRY';

function getCountriesData({ database, places }) {
  const countryGeonameIds = places
    .filter(({ type }) => type === COUNTRY_TYPE)
    .map(({ geonameId }) => geonameId);

  if (!countryGeonameIds.length) return [];
  return database.countries.findByGeonameIds(uniq(countryGeonameIds));
}

module.exports = getCountriesData;
