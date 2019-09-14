const sinon = require('sinon');
const proxyquire = require('proxyquire');
const database = require(`${ROOT_PATH}/lib/database`);
const {
  IP_IN_CACHE,
  IP_MATCHING_CITY,
  IP_NOT_FOUND,
  CITY_ID_1,
  CITY_ID_2
} = require('./constants');

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const IP_RELATIONS_TTL = 3 * 30 * ONE_DAY_IN_MS;

const populateMock = sinon.spy(function(params) {
  return params.place;
});

const discoverByIpMock = sinon.stub();

const getIpRelationsTtlMock = () => IP_RELATIONS_TTL;

const getByIp = proxyquire(`${ROOT_PATH}/lib/use-cases/places/get-by-ip`, {
  './populate': populateMock,
  './discover-by-ip': discoverByIpMock,
  '../../../config': { getIpRelationsTtl: getIpRelationsTtlMock }
});

describe('UseCases | Places | .getByIp', () => {
  const fixtures = require('./fixtures');
  const languages = ['en', 'it', 'de'];
  const [, PLACE_2] = fixtures.geonamesPlaces;

  beforeEach(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
    populateMock.resetHistory();
    discoverByIpMock.resetHistory();
  });

  it('should return a place where the relation is already in cache', async () => {
    const ip = IP_IN_CACHE;
    const place = await getByIp({database, ip, languages});

    expect(place).to.be.an('object');
    expect(place.id).to.be.equal(CITY_ID_1);

    expect(discoverByIpMock.callCount).to.be.equal(0);
    expectPopulateCall(place, languages);
  });

  it('should return a city which is not it cache but discovered', async () => {
    discoverByIpMock.resolves(PLACE_2);

    const ip = IP_MATCHING_CITY;
    const place = await getByIp({database, ip, languages});
    expect(place).to.be.an('object');
    expect(place.id).to.be.equal(CITY_ID_2);

    expectDiscoverByIpCall(ip);
    expectPopulateCall(place, languages);
    return expectCachedResults(ip, place.id);
  });

  it('should return null when is not it cache and couldn\'t be discovered', async () => {
    discoverByIpMock.resolves(null);

    const ip = IP_NOT_FOUND;
    const place = await getByIp({database, ip, languages});
    expect(place).to.be.equal(null);

    expectDiscoverByIpCall(ip);
    expect(populateMock.callCount).to.be.equal(0);
    return expectCachedResults(ip, null);
  });
});

function expectDiscoverByIpCall(expectedIp) {
  expect(discoverByIpMock.callCount).to.be.equal(1);

  const [args] = discoverByIpMock.firstCall.args;
  expect(args).to.be.an('object');
  expect(args.database).to.be.deep.equal(database);
  expect(args.ip).to.be.equal(expectedIp);
}

function expectPopulateCall(expectedPlace, expectedLanguages) {
  expect(populateMock.callCount).to.be.equal(1);

  const [args] = populateMock.firstCall.args;
  expect(args.database).to.be.deep.equal(database);
  expect(args.place).to.be.deep.equal(expectedPlace);
  expect(args.languages).to.be.deep.equal(expectedLanguages);
}

async function expectCachedResults(ip, expectedPlaceId) {
  const ipRelation = await database.ipRelations.findValidByIp(ip);

  expect(ipRelation).to.be.an('object');
  expect(ipRelation.ip).to.be.equal(ip);
  expect(ipRelation.placeId).to.be.equal(expectedPlaceId);

  const ttl = ipRelation.expiresAt.getTime() - Date.now();
  expect(ttl).to.be.closeTo(IP_RELATIONS_TTL, 10000);
}
