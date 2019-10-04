const {PLACE_ID, UNEXISTENT_PLACE_ID} = require('./constants');

const geonamesPlaces = testUtils.generateFixtures({
  type: 'geonamesPlace',
  recipe: [
    {
      id: PLACE_ID
    }
  ]
});

const indexedPlaces = testUtils.generateFixtures({
  type: 'indexedPlace',
  recipe: [
    {
      id: PLACE_ID,
      score: 10.0
    },
    {
      id: UNEXISTENT_PLACE_ID,
      score: 5.0
    }
  ]
});

module.exports = {
  geonamesPlaces,
  indexedPlaces
};
