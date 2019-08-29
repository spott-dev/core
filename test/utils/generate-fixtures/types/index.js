const commonTypes = require('fixtures-generator/types');

module.exports = {
  ...commonTypes,
  COUNTRY_ID: require('./country-id'),
  PLACE_ID: require('./place-id')
};
