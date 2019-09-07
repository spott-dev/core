const {
  GEONAME_ID_1,
  LANGUAGE_1,
  LANGUAGE_2,
  LANGUAGE_3,
  NAME_1,
  NAME_2,
  NAME_3
} = require('./constants');

const geonamesAlternateNames = testUtils.generateFixtures({
  type: 'geonamesAlternateName',
  recipe: [
    {
      geonameId: GEONAME_ID_1,
      language: LANGUAGE_1,
      name: NAME_1
    },
    {
      geonameId: GEONAME_ID_1,
      language: LANGUAGE_2,
      name: NAME_2
    },
    {
      geonameId: GEONAME_ID_1,
      language: LANGUAGE_3,
      name: NAME_3
    }
  ]
});

module.exports = {
  geonamesAlternateNames
};
