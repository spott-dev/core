const engines = require('./engines');
const stores = require('./stores');

module.exports = {
  ...stores,
  engines
};
