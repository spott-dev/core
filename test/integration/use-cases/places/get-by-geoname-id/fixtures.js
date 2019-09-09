const {PLACE_GEONAME_ID} = require('./constants');

const geonamesPlaces = testUtils.generateFixtures({
  type: 'geonamesPlace',
  recipe: [
    {
      geonameId: PLACE_GEONAME_ID
    }
  ]
});

module.exports = {
  geonamesPlaces
};
