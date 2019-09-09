const {
  CITY_ID,
  CITY_GEONAME_ID,
  ADMIN_DIVISION_1_ID,
  ADMIN_DIVISION_2_ID,
  COUNTRY_ID,
  COUNTRY_GEONAME_ID,
  DEFAULT_ALTERNATE_NAME
} = require('./constants');

const geonamesPlaces = testUtils.generateFixtures({
  type: 'geonamesPlace',
  recipe: [
    {
      id: CITY_ID,
      geonameId: CITY_GEONAME_ID,
      type: 'CITY',
      name: 'Guadalajara',
      asciiName: 'Guadalajara',
      alternateNames: ['GDL', 'Guanatos'],
      featureClass: 'P',
      featureCode: 'PPLC',
      countryId: COUNTRY_ID,
      adminDivision1Id: ADMIN_DIVISION_1_ID,
      adminDivision2Id: ADMIN_DIVISION_2_ID,
      population: 10000000,
      latitude: -42,
      longitude: 123,
      elevation: 1500,
      timezoneId: 'America/Mexico_City'
    },
    {
      id: COUNTRY_ID,
      geonameId: COUNTRY_GEONAME_ID,
      type: 'COUNTRY',
      name: 'Mexico',
      asciiName: 'Mexico',
      alternateNames: ['Mex', 'Mexiko'],
      featureClass: 'P',
      featureCode: 'PCLI',
      countryId: COUNTRY_ID,
      adminDivision1Id: undefined,
      adminDivision2Id: undefined,
      population: 100000000,
      latitude: undefined,
      longitude: undefined,
      elevation: undefined,
      timezoneId: undefined
    }, {
      id: ADMIN_DIVISION_1_ID,
      type: 'ADMIN_DIVISION_1',
      name: 'admin division 1'
    }, {
      id: ADMIN_DIVISION_2_ID,
      type: 'ADMIN_DIVISION_2',
      name: 'admin division 2'
    }
  ]
});

const geonamesCountries = testUtils.generateFixtures({
  type: 'geonamesCountry',
  recipe: [
    {
      geonameId: COUNTRY_GEONAME_ID,
      iso2: COUNTRY_ID,
      iso3: 'MEX',
      isoNumeric: '484',
      fips: 'MX',
      name: 'Mexico',
      capitalName: 'Mexico City',
      areaSqHm: 197255000,
      population: 112468855,
      continentId: 'NA',
      domain: '.mx',
      currencyCode: 'MXN',
      currencyName: 'Peso',
      postalCodeFormat: '#####',
      postalCodeRegex: '^(\d{5})$',
      phoneCodes: ['+52'],
      languages: ['es'],
      locales: ['es-MX'],
      neighbourCountryIds: ['US', 'GT', 'BZ']
    }
  ]
});

const geonamesAlternateNames = testUtils.generateFixtures({
  type: 'geonamesAlternateName',
  recipe: [
    {
      language: 'en',
      geonameId: CITY_GEONAME_ID,
      name: DEFAULT_ALTERNATE_NAME
    },
    {
      language: 'de',
      geonameId: CITY_GEONAME_ID,
      name: DEFAULT_ALTERNATE_NAME
    }
  ]
});

module.exports = {
  geonamesPlaces,
  geonamesCountries,
  geonamesAlternateNames
};
