const {MaxmindFetcher} = require('../fetchers');
const {getMaxmindCredentials} = require('../../config');

const maxmindFetcher = new MaxmindFetcher(getMaxmindCredentials());

module.exports = {
  getCityByIp: maxmindFetcher.getCityByIp.bind(maxmindFetcher)
};
