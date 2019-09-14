const {
  PLACE_ID_1,
  PLACE_ID_2,
  POPULATED_PLACE_ID_2,
  COUNTRY_ID
} = require('./constants');

const COUNTRY = {
  id: COUNTRY_ID,
  geonameId: 1,
  names: ['Country name']
};

const indexedPlaces = testUtils.generateFixtures({
  type: 'indexedPlace',
  recipe: [
    {
      id: PLACE_ID_1,
      type: 'CITY',
      names: ['Guadalajara'],
      population: 1000,
      coordinates: {
        lat: 0,
        lon: 0
      },
      country: COUNTRY
    },
    {
      id: PLACE_ID_2,
      type: 'CITY',
      names: ['Mexico'],
      population: 1000,
      coordinates: {
        lat: 0,
        lon: 0
      },
      country: COUNTRY
    },
    {
      id: POPULATED_PLACE_ID_2,
      type: 'CITY',
      names: ['Mexico'],
      population: 1000000,
      coordinates: {
        lat: 0,
        lon: 0
      },
      country: COUNTRY
    }
  ]
});

module.exports = {
  indexedPlaces
};
