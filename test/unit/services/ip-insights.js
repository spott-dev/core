const sinon = require('sinon');
const proxyquire = require('proxyquire');

const MAXMIND_CREDENTIALS = {
  username: 'maxmindUsername',
  password: 'maxminPassword'
};

const configMock = {
  getMaxmindCredentials: () => MAXMIND_CREDENTIALS
};

const getCityByIpMock = sinon.stub();

class MaxmindFetcherMock {
  constructor(credentials) {
    this.auth = credentials;
  }

  getCityByIp(...args) {
    return getCityByIpMock(this.auth, ...args);
  }
}

const IpInsightsService = proxyquire(`${ROOT_PATH}/lib/services/ip-insights`, {
  '../../config': configMock,
  '../fetchers': {MaxmindFetcher: MaxmindFetcherMock}
});

describe('Services | IpInsightsService', () => {
  beforeEach(getCityByIpMock.resetHistory);

  it('should pass credentials and arguments correctly', async () => {
    const IP = '127.0.0.1';
    await IpInsightsService.getCityByIp(IP);
    expect(getCityByIpMock.callCount).to.be.equal(1);

    const [actualCredentials, actualIp] = getCityByIpMock.firstCall.args;
    expect(actualCredentials).to.be.eql(MAXMIND_CREDENTIALS);
    expect(actualIp).to.be.equal(IP);
  });
});
