const database = require(`${ROOT_PATH}/lib/database`);

describe('Database | IndexedPlacesStore | .findByQueryAndFilter', () => {
  const fixtures = require('./fixtures');

  before(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should get multiple places by a query', async () => {
    const query = 'Guadalajara';
    const filter = undefined;

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(2);

    places.forEach(expectPlace);

    const [place1, place2] = places;
    expect(place1.id).to.be.equal('GDLMX');
    expect(place2.id).to.be.equal('GDLES');
  });

  it('should return most accurate name if available in query', async () => {
    const query = 'Guadalajara, Spain';
    const filter = undefined;

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(1);

    const [place1] = places;
    expect(place1.id).to.be.equal('GDLES');
  });

  it('should return most relevant places when sending an empty query', async () => {
    const query = '';
    const filter = undefined;

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(4);
  });

  it('should support limit option', async () => {
    const query = 'Guadalajara';
    const filter = undefined;
    const limit = 1;
    const options = { limit };

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter, options);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(limit);

    const [place1] = places;
    expect(place1.id).to.be.equal('GDLMX');
  });

  it('should support skip option', async () => {
    const query = 'Guadalajara';
    const filter = undefined;
    const limit = 1;
    const skip = 1;
    const options = { limit, skip };

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter, options);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(limit);

    const [place1] = places;
    expect(place1.id).to.be.equal('GDLES');
  });

  it('should support fields', async () => {
    const query = 'Guadalajara';
    const filter = undefined;
    const fields = ['names', 'type'];
    const options = { fields };

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter, options);
    expect(places).to.be.an('array');

    const [place1] = places;
    const expectedFields = [...fields, 'id', 'score'];
    expect(Object.keys(place1)).to.have.members(expectedFields);
  });

  it('should return empty array when skipping more results than available', async () => {
    const query = 'Guadalajara';
    const filter = undefined;
    const limit = 1;
    const skip = 10;
    const options = { limit, skip };

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter, options);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(0);
  });

  it('should filter places by country ids', async () => {
    const COUNTRY_ID = 'MX';
    const query = 'Guadalajara';
    const filter = {
      countryIds: [COUNTRY_ID]
    };

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(1);

    const [place1] = places;
    expect(place1.country.id).to.be.equal(COUNTRY_ID);
  });

  it('should filter places by adminDivision1 ids', async () => {
    const ADMIN_DIVISION_1_ID = 'ES.01';
    const query = 'Guadalajara';
    const filter = {
      adminDivision1Ids: [ADMIN_DIVISION_1_ID]
    };

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(1);

    const [place1] = places;
    expect(place1.adminDivision1.id).to.be.equal(ADMIN_DIVISION_1_ID);
  });

  it('should filter places by adminDivision2 ids', async () => {
    const ADMIN_DIVISION_2_ID = 'MX.14.124';
    const query = 'Guadalajara';
    const filter = {
      adminDivision2Ids: [ADMIN_DIVISION_2_ID]
    };

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(1);

    const [place1] = places;
    expect(place1.adminDivision2.id).to.be.equal(ADMIN_DIVISION_2_ID);
  });

  it('should filter places by coordinates', async () => {
    const query = 'Guadalajara';
    const filter = {
      coordinates: {
        latitude: 20,
        longitude: -103,
        accuracyRadiusKm: 1
      }
    };

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(1);

    const [place1] = places;
    expect(place1.id).to.be.equal('GDLMX');
  });

  it('should support accuracyRadiusKm option to find places in a large area', async () => {
    const query = 'Guadalajara';
    const filter = {
      coordinates: {
        latitude: 20,
        longitude: -103,
        accuracyRadiusKm: 100000
      }
    };

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(2);

    const [place1, place2] = places;
    expect(place1.id).to.be.equal('GDLMX');
    expect(place2.id).to.be.equal('GDLES');
  });

  it('should get places of any type by default, returning most populated first', async () => {
    const query = 'Mexico';
    const filter = undefined;

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(2);

    places.forEach(expectPlace);

    const [place1, place2] = places;
    expect(place1.id).to.be.equal('MEX2');
    expect(place1.type).to.be.equal('COUNTRY');
    expect(place2.id).to.be.equal('MEX1');
    expect(place2.type).to.be.equal('CITY');
  });

  it('should filter by type', async () => {
    const query = 'Mexico';
    const filter = {
      types: ['COUNTRY']
    };

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(1);

    const [place1] = places;
    expect(place1.id).to.be.equal('MEX2');
    expect(place1.type).to.be.equal('COUNTRY');
  });

  it('should return empty array when name doesn\'t match', async () => {
    const query = 'Random name';
    const filter = undefined;

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(0);
  });

  it('should return empty array when name is misspelled', async () => {
    const query = 'Guadelajara';
    const filter = undefined;

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(0);
  });

  it('should return null when filtering by other type', async () => {
    const query = 'Guadalajara';
    const filter = {
      types: ['ADMIN_DIVISION_1']
    };

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(0);
  });

  it('should return empty array when name matches name but is outside geographic radius', async () => {
    const query = 'Guadalajara';
    const filter = {
      coordinates: {
        latitude: 10,
        longitude: 10,
        accuracyRadiusKm: 1
      }
    };

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(0);
  });

  it('should return empty array when place matches name and location but filtered by distinct country', async () => {
    const CHINA_ID = 'CN';
    const query = 'Guadalajara';
    const filter = {
      countryIds: [CHINA_ID]
    };

    const places = await database.indexedPlaces.findByQueryAndFilter(query, filter);
    expect(places).to.be.an('array');
    expect(places.length).to.be.equal(0);
  });
});

function expectPlace(place) {
  expect(place).to.be.an('object');
  expect(place.id).to.be.a('string');
  expect(place.geonameId).to.be.a('number');
  expect(place.score).to.be.a('number');
}
