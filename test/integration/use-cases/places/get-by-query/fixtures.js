const {PLACE_ID} = require('./constants');

const indexedPlaces = testUtils.generateFixtures({
  type: 'indexedPlace',
  recipe: [
    {
      id: PLACE_ID,
      geonameId: 1,
      names: ['Guadalajara'],
      country: {
        id: 'MX',
        geonameId: 2,
        names: ['Mexico']
      },
      adminDivision1: {
        id: 'MX.14',
        geonameId: 3,
        names: ['Jalisco']
      },
      adminDivision2: {
        id: 'MX.14.001',
        geonameId: 4,
        names: ['Guadalajara']
      }
    }
  ]
});

const geonamesPlaces = testUtils.generateFixtures({
  type: 'geonamesPlace',
  recipe: [
    {
      id: PLACE_ID
    }
  ]
});

module.exports = {
  indexedPlaces,
  geonamesPlaces
};
