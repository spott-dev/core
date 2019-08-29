const {PLACE_ID_1} = require('./constants');

const geonamesPlaces = testUtils.generateFixtures({
  type: 'geonamesPlace',
  recipe: [
    {
      id: PLACE_ID_1
    }
  ]
});

module.exports = {
  geonamesPlaces
};
