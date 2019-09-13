const {PLACE_ID_1, PLACE_ID_2} = require('./constants');

const indexedPlaces = testUtils.generateFixtures({
  type: 'indexedPlace',
  recipe: [
    {
      id: PLACE_ID_1,
      population: 1000,
      updatedAt: new Date(0)
    },
    {
      id: PLACE_ID_2,
      population: 1000,
      updatedAt: new Date(0)
    }
  ]
});

module.exports = {
  indexedPlaces
};
