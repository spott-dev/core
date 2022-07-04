const { omit } = require('lodash');
const { postgres, postgresRead } = require('../../engines');
const buildPostgresStore = require('../../build-store/postgres');
const buildFindByIp = require('./build-find-by-ip');
const buildFindValidByIp = require('./build-find-valid-by-ip');
const { camelizeObject, snakeObject, snakeArray } = require('../../parsers');

const TABLE_NAME = 'ip_relations';
const CONFLICT_TARGETS = ['ip'];
const UPDATED_AT_FIELD = 'updated_at';

function buildStore() {
  const params = {
    postgres,
    postgresRead,
    tableName: TABLE_NAME,
    conflictTargets: CONFLICT_TARGETS,
    updatedAtField: UPDATED_AT_FIELD,
    parseForStorage: snakeObject,
    parseForDelivery: camelizeObject,
    parseFields: snakeArray
  };

  const store = omit(
    buildPostgresStore(params),
    ['findById']
  );
  const findByIp = buildFindByIp(postgresRead, params);
  const findValidByIp = buildFindValidByIp(postgresRead, params);

  return {
    ...store,
    findByIp,
    findValidByIp
  };
}

module.exports = buildStore();
