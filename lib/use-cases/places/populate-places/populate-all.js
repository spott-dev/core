const { keyBy } = require('lodash');
const getLocalizedNames = require('./get-localized-names');

const PARENTS_MAP = {
  CITY: ['country', 'adminDivision1', 'adminDivision2'],
  ADMIN_DIVISION_2: ['country', 'adminDivision1'],
  ADMIN_DIVISION_1: ['country'],
  COUNTRY: []
};

const CODES_MAP = {
  adminDivision1: 'adminDivision1Code',
  adminDivision2: 'adminDivision2Code',
  country: 'countryCode'
};

const populateAll = async ({
  database,
  languages,
  places,
  countriesData,
  parentsData,
}) => {
  const countriesByGId = keyBy(countriesData, 'geonameId');
  const parentsByCode = keyBy(parentsData, 'code');

  const populateOne = async (place) => {
    const { type, geonameId } = place;

    const countryProperties = countriesByGId[geonameId] || {};
    const localizedNames = await getLocalizedNames({ database, geonameId, languages });

    const parents = PARENTS_MAP[type].reduce((result, parent) => {
      const codeKey = CODES_MAP[parent];
      const placeCode = place[codeKey];
      if (placeCode) result[parent] = parentsByCode[placeCode];
      return result;
    }, {});

    return {
      ...place,
      ...countryProperties,
      ...parents,
      localizedNames
    };
  }

  return Promise.all(places.map(populateOne));
}

module.exports = populateAll;
