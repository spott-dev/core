const knex = require('knex');
const {getPostgresConfig} = require('../../config');

const postgres = knex({
  client: 'pg',
  connection: getPostgresConfig()
});

module.exports = postgres;
