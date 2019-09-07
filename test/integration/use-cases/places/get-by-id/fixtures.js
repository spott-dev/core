const {PLACE_ID} = require('./constants');

const geonamesPlaces = testUtils.generateFixtures({
  type: 'geonamesPlace',
  recipe: [
    {
      id: PLACE_ID
    }
  ]
});

module.exports = {
  geonamesPlaces
};
