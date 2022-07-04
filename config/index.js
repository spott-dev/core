const {env} = process;

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_MONTHS_IN_MS = 3 * 30 * ONE_DAY_IN_MS;

const getPostgresConfig = () => ({
  host: env.POSTGRESQL_HOST || 'localhost',
  port: env.POSTGRESQL_PORT || '5432',
  user: env.POSTGRESQL_USER || 'postgres',
  password: env.POSTGRESQL_PASS || null,
  database: env.POSTGRESQL_DATABASE
});

module.exports = {
  getPostgresConfig,

  getReadOnlyPostgresConfig: () => ({
    ...getPostgresConfig(),
    host: env.POSTGRESQL_HOST_READ || env.POSTGRESQL_HOST || 'localhost',
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
  }),

  getIpRelationsTtl: () => THREE_MONTHS_IN_MS
};
