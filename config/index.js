const {env} = process;

module.exports = {
  getPostgresConfig: () => ({
    host: env.POSTGRESQL_HOST || 'localhost',
    port: env.POSTGRESQL_PORT || '5432',
    user: env.POSTGRESQL_USER || 'postgres',
    password: env.POSTGRESQL_PASS || null,
    database: env.POSTGRESQL_DATABASE
  }),

  getElasticsearchConfig: () => ({
    node: env.ELASTICSEARCH_NODE,
    auth: {
      username: env.ELASTICSEARCH_USERNAME,
      password: env.ELASTICSEARCH_PASSWORD
    }
  }),

  getElasticsearchCollections: () => ({
    places: env.ELASTICSEARCH_PLACES_INDEX
  }),

  getMaxmindCredentials: () => ({
    username: env.MAXMIND_USERNAME,
    password: env.MAXMIND_PASSWORD
  })
};
