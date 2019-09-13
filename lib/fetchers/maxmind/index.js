const assert = require('assert');
const getCityByIp = require('./get-city-by-ip');

class MaxmindFetcher {
  constructor({username, password}) {
    assert(username, 'Parameter "username" is required for Maxmind fetcher');
    assert(password, 'Parameter "password" is required for Maxmind fetcher');

    this.auth = {username, password};
  }

  getCityByIp(...args) {
    return getCityByIp(this.auth, ...args);
  }
}

module.exports = MaxmindFetcher;
