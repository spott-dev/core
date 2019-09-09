const useCases = require('./use-cases');

module.exports = {
  ...useCases,
  database: require('./database')
};
