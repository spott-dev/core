const {PLACE_ID_1} = require('./constants');

const indexedPlaces = testUtils.generateFixtures({
  type: 'indexedPlace',
  recipe: [
    {
      id: PLACE_ID_1,
      population: 1000,
      updatedAt: new Date(0)
    }
  ]
});

module.exports = {
  indexedPlaces
};
