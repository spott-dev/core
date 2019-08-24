require('./config/load');
const {getPostgresConfig} = require('./config');
const MIGRATIONS_TABLE_NAME = 'knex_migrations';
const MIGRATIONS_DIRECTORY = './migrations/postgres';

module.exports = {
  client: 'postgresql',
  connection: getPostgresConfig(),
  migrations: {
    directory: MIGRATIONS_DIRECTORY,
    tableName: MIGRATIONS_TABLE_NAME
  }
};
