const {IP_1, IP_2, PLACE_ID} = require('./constants');

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

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
      placeId: PLACE_ID,
      expiresAt: getExpiresAt(ONE_DAY_IN_MS)
    },
    {
      ip: IP_2,
      placeId: PLACE_ID,
      expiresAt: getExpiresAt(-1)
    }
  ]
});

function getExpiresAt(timeDiff) {
  return new Date(Date.now() + timeDiff);
}

module.exports = {
  geonamesPlaces,
  ipRelations
};
