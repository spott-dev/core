const {PLACE_ID_1} = require('./constants');

const indexedPlaces = testUtils.generateFixtures({
  type: 'indexedPlace',
  recipe: [
    {
      id: PLACE_ID_1
    }
  ]
});

module.exports = {
  indexedPlaces
};
