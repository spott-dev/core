const {
  IP_MATCHING_CITY,
  IP_MATCHING_COUNTRY,
  CITY_GEONAME_ID,
  COUNTRY_ID,
  COUNTRY_GEONAME_ID
} = require('./constants');

const COUNTRY = {
  iso2: COUNTRY_ID,
  geonameId: COUNTRY_GEONAME_ID,
  name: 'Mex'
};

const [
  IP_INSIGHTS_MATCHING_CITY,
  IP_INSIGHTS_MATCHING_COUNTRY,
  IP_INSIGHTS_WITH_SIMILAR_CITY,
  IP_INSIGHTS_WITHOUT_SIMILAR_CITY
] = testUtils.generateFixtures({
  type: 'ipInsights',
  recipe: [
    {
      ip: IP_MATCHING_CITY,
      city: {
        geonameId: CITY_GEONAME_ID,
        name: 'Gdl'
      },
      country: COUNTRY
    },
    {
      ip: IP_MATCHING_COUNTRY,
      city: undefined,
      country: COUNTRY
    },
    {
      coordinates: {
        latitude: 21,
        longitude: -103,
        accuracyRadiusKm: 100
      },
      city: {
        geonameId: 123,
        name: 'Guadalajara'
      },
      country: COUNTRY
    },
    {
      coordinates: {
        latitude: 25,
        longitude: -100,
        accuracyRadiusKm: 100
      },
      city: {
        geonameId: 456,
        name: 'Monterrey'
      },
      country: COUNTRY
    }
  ]
});

module.exports = {
  IP_INSIGHTS_MATCHING_CITY,
  IP_INSIGHTS_MATCHING_COUNTRY,
  IP_INSIGHTS_WITH_SIMILAR_CITY,
  IP_INSIGHTS_WITHOUT_SIMILAR_CITY
};
