const axios = require('axios');
const parseIpResponse = require('./parse-ip-response');
const parseErrorResponse = require('./parse-error-response');

const ENDPOINT = 'https://geoip.maxmind.com/geoip/v2.1/city';

function getCityByIp(auth, ip) {
  const execute = () => {
    return fecthData()
      .then(parseIpResponse)
      .catch(parseErrorResponse);
  };

  const fecthData = () => {
    const method = 'get';
    const url = `${ENDPOINT}/${ip}`;
    return axios.request({method, url, auth});
  };

  return execute();
}

module.exports = getCityByIp;
