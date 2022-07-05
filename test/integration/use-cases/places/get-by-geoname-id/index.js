const sinon = require('sinon');
const proxyquire = require('proxyquire');
const database = require(`${ROOT_PATH}/lib/database`);
const {
  PLACE_GEONAME_ID,
  NON_EXISTENT_PLACE_GEONAME_ID
} = require('./constants');

const populateMock = sinon.spy(function(params) {
  return params.place;
});

const getById = proxyquire(`${ROOT_PATH}/lib/use-cases/places/get-by-geoname-id`, {
  './populatePlace': populateMock
});

describe('UseCases | Places | .getByGeonameId', () => {
  const fixtures = require('./fixtures');

  before(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should return a place found by geonameId', async () => {
    const place = await getById({database, geonameId: PLACE_GEONAME_ID});
    expect(place).to.be.an('object');
    expect(place.geonameId).to.be.equal(PLACE_GEONAME_ID);
  });

  it('should populate the place before returning it', async () => {
    populateMock.resetHistory();

    const geonameId = PLACE_GEONAME_ID;
    const languages = ['en', 'it', 'de'];
    const place = await getById({database, geonameId, languages});

    expect(populateMock.callCount).to.be.equal(1);

    const [args] = populateMock.firstCall.args;
    expect(args.database).to.be.deep.equal(database);
    expect(args.place).to.be.deep.equal(place);
    expect(args.languages).to.be.deep.equal(languages);
  });

  it('should return null for a non existent place', async () => {
    const place = await getById({database, geonameId: NON_EXISTENT_PLACE_GEONAME_ID});
    expect(place).to.be.equal(null);
  });
});
