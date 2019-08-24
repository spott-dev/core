const IGNORE_TABLES = [
  'knex_migrations',
  'knex_migrations_lock'
];

async function buildResetPostgres() {
  const knex = require('../../../database/engines/postgres');
  const tables = await getTablesToReset(knex);

  return () => {
    const promises = tables.map(table => knex(table).del());
    return Promise.all(promises);
  };
}

async function getTablesToReset(knex) {
  const data = await knex.raw('SELECT tablename FROM pg_tables WHERE schemaname=\'public\'');
  return data.rows.reduce((result, {tablename}) => {
    if (!IGNORE_TABLES.includes(tablename)) result.push(tablename);
    return result;
  }, []);
}

module.exports = buildResetPostgres;
