const { PLACE_ID_1, PLACE_ID_2, PLACE_ID_3 } = require('./constants');

const geonamesPlaces = testUtils.generateFixtures({
  type: 'geonamesPlace',
  recipe: [
    {
      id: PLACE_ID_1
    },
    {
      id: PLACE_ID_2
    },
    {
      id: PLACE_ID_3
    },
  ]
});

module.exports = {
  geonamesPlaces
};
