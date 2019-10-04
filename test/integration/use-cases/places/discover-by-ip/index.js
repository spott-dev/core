const sinon = require('sinon');
const proxyquire = require('proxyquire');
const {ObjectNotFoundError} = require('spott-errors');
const database = require(`${ROOT_PATH}/lib/database`);
const {
  IP_MATCHING_CITY,
  IP_MATCHING_COUNTRY,
  IP_NOT_FOUND,
  IP_WITH_SIMILAR_PLACE,
  IP_WITHOUT_SIMILAR_PLACE,
  CITY_ID,
  COUNTRY_ID
} = require('./constants');

const getCityByIpMock = sinon.stub();

const IpInsightsServiceMock = { getCityByIp: getCityByIpMock };

const discoverByIp = proxyquire(`${ROOT_PATH}/lib/use-cases/places/discover-by-ip`, {
  '../../services': { IpInsightsService: IpInsightsServiceMock }
});

const findByQueryAndFilterSpy = sinon.spy(database.indexedPlaces, 'findByQueryAndFilter');

describe('UseCases | Places | .discoverByIp', () => {
  const responses = require('./responses');
  const fixtures = require('./fixtures');

  beforeEach(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
    getCityByIpMock.resetHistory();
    findByQueryAndFilterSpy.resetHistory();
  });

  describe('When ip insights matches with existing place', () => {
    it('should return a city matching ip insights', async () => {
      getCityByIpMock.resolves(responses.IP_INSIGHTS_MATCHING_CITY);

      const ip = IP_MATCHING_CITY;
      const place = await discoverByIp({database, ip});

      expect(place).to.be.an('object');
      expect(place.id).to.be.equal(CITY_ID);

      expectGetCityByIpCall(ip);
      expect(findByQueryAndFilterSpy.callCount).to.be.equal(0);
    });

    it('should return a country matching ip insights when city is not available', async () => {
      getCityByIpMock.resolves(responses.IP_INSIGHTS_MATCHING_COUNTRY);

      const ip = IP_MATCHING_COUNTRY;
      const place = await discoverByIp({database, ip});

      expect(place).to.be.an('object');
      expect(place.id).to.be.equal(COUNTRY_ID);

      expectGetCityByIpCall(ip);
      expect(findByQueryAndFilterSpy.callCount).to.be.equal(0);
    });
  });

  describe('When ip insights throws ObjectNotFoundError', () => {
    const ip = IP_NOT_FOUND;

    beforeEach(() => getCityByIpMock.rejects(new ObjectNotFoundError()));

    it('should return null when ip insights not found', async () => {
      const place = await discoverByIp({database, ip});
      expect(place).to.be.equal(null);

      expectGetCityByIpCall(ip);
      expect(findByQueryAndFilterSpy.callCount).to.be.equal(0);
    });
  });

  describe('When it\'s needed to find a similar place from ip insights', () => {
    it('should return the place discovered from ip insights', async () => {
      getCityByIpMock.resolves(responses.IP_INSIGHTS_WITH_SIMILAR_CITY);

      const ip = IP_WITH_SIMILAR_PLACE;
      const place = await discoverByIp({database, ip});

      expect(place).to.be.an('object');
      expect(place.id).to.be.equal(CITY_ID);

      expectGetCityByIpCall(ip);
      expectFindByQueryAndFilterCall('Guadalajara', {
        types: ['CITY'],
        countryIds: ['MX'],
        coordinates: {
          latitude: 21,
          longitude: -103,
          accuracyRadiusKm: 100
        }
      });
    });

    it('should return null when it wasn\'t possible to find a similar place', async () => {
      getCityByIpMock.resolves(responses.IP_INSIGHTS_WITHOUT_SIMILAR_CITY);

      const ip = IP_WITHOUT_SIMILAR_PLACE;
      const place = await discoverByIp({database, ip});
      expect(place).to.be.equal(null);

      expectGetCityByIpCall(ip);
      expectFindByQueryAndFilterCall('Monterrey', {
        types: ['CITY'],
        countryIds: ['MX'],
        coordinates: {
          latitude: 25,
          longitude: -100,
          accuracyRadiusKm: 100
        }
      });
    });
  });
});

function expectGetCityByIpCall(expectedIp) {
  expect(getCityByIpMock.callCount).to.be.equal(1);

  const [ip] = getCityByIpMock.firstCall.args;
  expect(ip).to.be.equal(expectedIp);
}

function expectFindByQueryAndFilterCall(expectedQuery, expectedFilter) {
  expect(findByQueryAndFilterSpy.callCount).to.be.equal(1);
  const expectedOptions = { limit: 1, fields: ['id'] };

  const [query, filter, options] = findByQueryAndFilterSpy.firstCall.args;
  expect(query).to.be.equal(expectedQuery);
  expect(filter).to.be.eql(expectedFilter);
  expect(options).to.be.eql(expectedOptions);
}
