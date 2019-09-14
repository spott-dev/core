const {
  CITY_ID,
  CITY_GEONAME_ID,
  COUNTRY_ID,
  COUNTRY_GEONAME_ID
} = require('./constants');

const geonamesPlaces = testUtils.generateFixtures({
  type: 'geonamesPlace',
  recipe: [
    {
      id: CITY_ID,
      geonameId: CITY_GEONAME_ID
    },
    {
      id: COUNTRY_ID,
      geonameId: COUNTRY_GEONAME_ID
    }
  ]
});

const indexedPlaces = testUtils.generateFixtures({
  type: 'indexedPlace',
  recipe: [
    {
      id: CITY_ID,
      names: ['Guadalajara'],
      type: 'CITY',
      coordinates: {
        lat: 21,
        lon: -103
      },
      country: {
        id: COUNTRY_ID,
        geonameId: COUNTRY_GEONAME_ID,
        names: ['Mexico']
      }
    }
  ]
});

module.exports = {
  geonamesPlaces,
  indexedPlaces
};
