const {
  IP_IN_CACHE,
  IP_IN_CACHE_NULL,
  CITY_ID_1,
  CITY_ID_2
} = require('./constants');

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const VALID_EXPIRES_AT = new Date(Date.now() + ONE_DAY_IN_MS);

const geonamesPlaces = testUtils.generateFixtures({
  type: 'geonamesPlace',
  recipe: [
    {
      id: CITY_ID_1
    },
    {
      id: CITY_ID_2
    }
  ]
});

const ipRelations = testUtils.generateFixtures({
  type: 'ipRelation',
  recipe: [
    {
      ip: IP_IN_CACHE,
      placeId: CITY_ID_1,
      expiresAt: VALID_EXPIRES_AT
    },
    {
      ip: IP_IN_CACHE_NULL,
      placeId: null,
      expiresAt: VALID_EXPIRES_AT
    }
  ]
});

module.exports = {
  geonamesPlaces,
  ipRelations
};
