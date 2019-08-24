const {env} = process;

module.exports = {
  getPostgresConfig: () => ({
    host: env.POSTGRESQL_HOST || 'localhost',
    port: env.POSTGRESQL_PORT || '5432',
    user: env.POSTGRESQL_USER || 'postgres',
    password: env.POSTGRESQL_PASS || null,
    database: env.POSTGRESQL_DATABASE
  })
};
