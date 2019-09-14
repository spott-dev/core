const {IP_1, IP_V6_1, PLACE_ID} = require('./constants');

const geonamesPlaces = testUtils.generateFixtures({
  type: 'geonamesPlace',
  recipe: [
    {
      id: PLACE_ID
    }
  ]
});

const ipRelations = testUtils.generateFixtures({
  type: 'ipRelation',
  recipe: [
    {
      ip: IP_1,
      placeId: PLACE_ID
    },
    {
      ip: IP_V6_1,
      placeId: PLACE_ID
    }
  ]
});

module.exports = {
  geonamesPlaces,
  ipRelations
};
