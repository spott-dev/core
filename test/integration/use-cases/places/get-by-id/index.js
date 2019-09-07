const sinon = require('sinon');
const proxyquire = require('proxyquire');
const database = require(`${ROOT_PATH}/lib/database`);
const {
  PLACE_ID,
  NON_EXISTENT_PLACE_ID
} = require('./constants');

const populateMock = sinon.spy(function(params) {
  return params.place;
});

const getById = proxyquire(`${ROOT_PATH}/lib/use-cases/places/get-by-id`, {
  './populate': populateMock
});

describe('UseCases | Places | .getById', () => {
  const fixtures = require('./fixtures');

  before(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should return the a place found by id', async () => {
    const place = await getById({database, id: PLACE_ID});
    expect(place).to.be.an('object');
    expect(place.id).to.be.equal(PLACE_ID);
  });

  it('should populate the place before returning it', async () => {
    populateMock.resetHistory();

    const id = PLACE_ID;
    const languages = ['en', 'it', 'de'];
    const place = await getById({database, id, languages});

    expect(populateMock.callCount).to.be.equal(1);

    const [args] = populateMock.firstCall.args;
    expect(args.database).to.be.deep.equal(database);
    expect(args.place).to.be.deep.equal(place);
    expect(args.languages).to.be.deep.equal(languages);
  });

  it('should return null for a non existent place', async () => {
    const place = await getById({database, id: NON_EXISTENT_PLACE_ID});
    expect(place).to.be.equal(null);
  });
});
