const database = require(`${ROOT_PATH}/lib/database`);
const {
  PLACE_ID_1,
  POPULATED_PLACE_ID_2,
  COUNTRY_ID
} = require('./constants');

const CITY_TYPE = 'CITY';
const PLACE_COORDINATES = {
  latitude: 0,
  longitude: 0,
  accuracyRadiusKm: 1
};

describe('Database | IndexedPlacesStore | .findByNameAndFilter', () => {
  const fixtures = require('./fixtures');

  before(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should get a place by name, coordinates and countries', async () => {
    const name = 'Guadalajara';
    const filter = {
      types: [CITY_TYPE],
      countries: [COUNTRY_ID],
      coordinates: PLACE_COORDINATES
    };

    const place = await database.indexedPlaces.findByNameAndFilter(name, filter);
    expect(place).to.be.an('object');
    expect(place.id).to.be.equal(PLACE_ID_1);
  });

  it('should return null when name doesn\'t match', async () => {
    const name = 'Random name';
    const filter = {
      types: [CITY_TYPE],
      countries: [COUNTRY_ID],
      coordinates: PLACE_COORDINATES
    };

    const place = await database.indexedPlaces.findByNameAndFilter(name, filter);
    expect(place).to.be.equal(null);
  });

  it('should return null when filtering by other type', async () => {
    const name = 'Random name';
    const filter = {
      types: ['COUNTRY'],
      countries: [COUNTRY_ID],
      coordinates: PLACE_COORDINATES
    };

    const place = await database.indexedPlaces.findByNameAndFilter(name, filter);
    expect(place).to.be.equal(null);
  });

  it('should return null when name matches name but is outside geographic radius', async () => {
    const name = 'Guadalajara';
    const filter = {
      types: [CITY_TYPE],
      countries: [COUNTRY_ID],
      coordinates: {
        ...PLACE_COORDINATES,
        latitude: 10,
        longitude: 10
      }
    };

    const place = await database.indexedPlaces.findByNameAndFilter(name, filter);
    expect(place).to.be.equal(null);
  });

  it('should return a place that is too far but geographic radius is large enough', async () => {
    const name = 'Guadalajara';
    const filter = {
      types: [CITY_TYPE],
      countries: [COUNTRY_ID],
      coordinates: {
        ...PLACE_COORDINATES,
        accuracyRadiusKm: 1000
      }
    };

    const place = await database.indexedPlaces.findByNameAndFilter(name, filter);
    expect(place).to.be.an('object');
    expect(place.id).to.be.equal(PLACE_ID_1);
  });

  it('should return null when place matches name and location but filtered by distinct country', async () => {
    const CHINA_ID = 'CN';
    const name = 'Guadalajara';
    const filter = {
      types: [CITY_TYPE],
      countries: [CHINA_ID],
      coordinates: PLACE_COORDINATES
    };

    const place = await database.indexedPlaces.findByNameAndFilter(name, filter);
    expect(place).to.be.equal(null);
  });

  it('should prefer place over other with the same name and coordinates when population is higher', async () => {
    const name = 'Mexico';
    const place = await database.indexedPlaces.findByNameAndFilter(name);

    expect(place).to.be.an('object');
    expect(place.id).to.be.equal(POPULATED_PLACE_ID_2);
  });
});
