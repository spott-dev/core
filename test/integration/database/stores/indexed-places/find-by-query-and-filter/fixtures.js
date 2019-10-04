const COUNTRY_MX = {
  id: 'MX',
  geonameId: 1,
  names: ['Mexico']
};

const ADMIN_DIVISION_1_MX = {
  id: 'MX.14',
  geonameId: 2,
  names: ['Jalisco']
};

const ADMIN_DIVISION_2_MX = {
  id: 'MX.14.124',
  geonameId: 4,
  names: ['Guadalajara']
};

const COUNTRY_ES = {
  id: 'ES',
  geonameId: 101,
  names: ['Spain']
};

const ADMIN_DIVISION_1_ES = {
  id: 'ES.01',
  geonameId: 102,
  names: ['Castilla-La Mancha']
};

const ADMIN_DIVISION_2_ES = {
  id: 'ES.01.001',
  geonameId: 102,
  names: ['Guadalajara']
};

const indexedPlaces = testUtils.generateFixtures({
  type: 'indexedPlace',
  recipe: [
    {
      id: 'GDLMX',
      type: 'CITY',
      names: ['Guadalajara'],
      population: 70000,
      coordinates: {
        lat: 20,
        lon: -103
      },
      country: COUNTRY_MX,
      adminDivision1: ADMIN_DIVISION_1_MX,
      adminDivision2: ADMIN_DIVISION_2_MX
    },
    {
      id: 'GDLES',
      type: 'CITY',
      names: ['Guadalajara'],
      population: 1000,
      coordinates: {
        lat: 0,
        lon: 0
      },
      country: COUNTRY_ES,
      adminDivision1: ADMIN_DIVISION_1_ES,
      adminDivision2: ADMIN_DIVISION_2_ES
    },
    {
      id: 'MEX1',
      type: 'CITY',
      names: ['Mexico'],
      population: 1000,
      coordinates: {
        lat: 0,
        lon: 0
      },
      country: COUNTRY_MX
    },
    {
      id: 'MEX2',
      type: 'COUNTRY',
      names: ['Mexico'],
      population: 1000000,
      coordinates: {
        lat: 0,
        lon: 0
      },
      country: COUNTRY_MX
    }
  ]
});

module.exports = {
  indexedPlaces
};
