const knex = require('knex');
const { getReadOnlyPostgresConfig } = require('../../../config');

const postgresRead = knex({
  client: 'pg',
  connection: getReadOnlyPostgresConfig()
});

module.exports = postgresRead;
