const {GEONAME_ID_1, GEONAME_ID_2, GEONAME_ID_3} = require('./constants');

const geonamesPlaces = testUtils.generateFixtures({
  type: 'geonamesPlace',
  recipe: [
    {
      geonameId: GEONAME_ID_1
    },
    {
      geonameId: GEONAME_ID_2
    },
    {
      geonameId: GEONAME_ID_3
    }
  ]
});

module.exports = {
  geonamesPlaces
};
