const nock = require('nock');
const responses = require('./responses');
const {BadInputError, ObjectNotFoundError, ServerError, UnknownError} = require('spott-errors');
const getCityByIp = require(`${ROOT_PATH}/lib/fetchers/maxmind/get-city-by-ip`);
const {
  AUTH_USERNAME,
  AUTH_PASSWORD,
  IP_WITH_CITY,
  IP_WITHOUT_CITY,
  IP_WITH_ERROR
} = require('./constants');

describe('Fetchers | MaxmindFetcher | .getCityByIp', () => {
  const auth = {username: AUTH_USERNAME, password: AUTH_PASSWORD};

  it('should fetch a place by ip expecting city response', async () => {
    const ip = IP_WITH_CITY;
    const expectedResponse = {
      ip: '189.217.104.79',
      coordinates: {
        latitude: 19.4342,
        longitude: -99.1386,
        accuracyRadiusKm: 20
      },
      timezoneId: 'America/Mexico_City',
      country: {
        iso2: 'MX',
        geonameId: '3996063',
        name: 'Mexico'
      },
      city: {
        geonameId: '3530597',
        name: 'Mexico City'
      }
    };

    mockMaxmindResponse(ip);

    const response = await getCityByIp(auth, ip);
    expect(response).to.be.eql(expectedResponse);
  });

  it('should fetch a place by ip expecting no city response', async () => {
    const ip = IP_WITHOUT_CITY;
    const expectedResponse = {
      ip: '189.163.219.127',
      coordinates: {
        latitude: 19.4371,
        longitude: -99.0111,
        accuracyRadiusKm: 1000
      },
      timezoneId: null,
      country: {
        iso2: 'MX',
        geonameId: '3996063',
        name: 'Mexico'
      },
      city: null
    };

    mockMaxmindResponse(ip);

    const response = await getCityByIp(auth, ip);
    expect(response).to.be.eql(expectedResponse);
  });

  it('should throw BadInputError when fetching a reserved ip', () => {
    const ip = IP_WITH_ERROR;
    const expectedError = 'The IP address \'127.0.0.1\' is a reserved IP address (private, multicast, etc.).';

    mockMaxmindResponse(ip, 'RESERVED_IP');

    return expect(getCityByIp(auth, ip)).to.be.eventually.rejectedWith(BadInputError, expectedError);
  });

  it('should throw BadInputError when fetching an invalid ip', () => {
    const ip = 'INVALID_IP';
    const expectedError = 'Paratemer "ip" is invalid, must be either an IP v4 or v6.';

    mockMaxmindResponse(ip, 'INVALID_IP');

    return expect(getCityByIp(auth, ip)).to.be.eventually.rejectedWith(BadInputError, expectedError);
  });

  it('should throw ObjectNotFoundError when can not find ip', () => {
    const ip = IP_WITH_ERROR;
    const expectedError = 'The supplied IP address is not in the database.';

    mockMaxmindResponse(ip, 'NOT_FOUND');

    return expect(getCityByIp(auth, ip)).to.be.eventually.rejectedWith(ObjectNotFoundError, expectedError);
  });

  it('should throw ServerError when getting an unauthorized error', () => {
    const ip = IP_WITH_ERROR;
    const expectedError = 'Unknown error fetching IP data.';

    mockMaxmindResponse(ip, 'UNAUTHORIZED');

    return expect(getCityByIp(auth, ip)).to.be.eventually.rejectedWith(ServerError, expectedError);
  });

  it('should throw UnknownError when getting an unhandled error', () => {
    const ip = IP_WITH_ERROR;
    const expectedError = 'Unknown error fetching IP data.';

    mockMaxmindResponse(ip, 'UNKNOWN_ERROR');

    return expect(getCityByIp(auth, ip)).to.be.eventually.rejectedWith(UnknownError, expectedError);
  });
});

function mockMaxmindResponse(ip, responseType) {
  const url = 'https://geoip.maxmind.com';
  const path = `/geoip/v2.1/city/${ip}`;
  const response = responses[responseType || ip];
  const {status, data} = response;
  return nock(url)
    .get(path)
    .basicAuth({ user: AUTH_USERNAME, pass: AUTH_PASSWORD })
    .reply(status, data);
}
