const {head, isPlainObject} = require('lodash');

function buildUpsert(knex, params) {
  const {
    tableName,
    conflictTargets,
    updatedAtField,
    parseForDelivery,
    parseForStorage
  } = params;

  return async (item, options = {}) => {
    const parsedItem = parseForStorage(item);

    if (updatedAtField) parsedItem[updatedAtField] = new Date();

    const result = await makeRawUpsert(knex, tableName, conflictTargets, parsedItem, options);

    return parseForDelivery(result);
  };
}

function makeRawUpsert(knex, tableName, conflictTargets, item, options) {
  const exclusions = Object.keys(item)
    .map(c => knex.raw('?? = EXCLUDED.??', [c, c]).toString())
    .join(',\n');

  const data = Object.keys(item).reduce((result, key) => {
    const value = isPlainObject(item[key]) ? JSON.stringify(item[key]) : item[key];
    return {...result, [key]: value};
  }, {});

  const insertString = knex(tableName).insert(data).toString();
  const conflictString = knex.raw(` ON CONFLICT (${conflictTargets.join(',')}) DO UPDATE SET ${exclusions} RETURNING *;`).toString();
  const query = (insertString + conflictString).replace(/\?/g, '\\?');

  if (options.transaction) knex.transacting(options.transaction);

  return knex.raw(query)
    .then(result => Object.assign({}, head(result.rows)));
}

module.exports = buildUpsert;
