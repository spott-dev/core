const TABLE_NAME = 'places';

exports.up = function(knex) {
  return knex
    .raw('CREATE EXTENSION IF NOT EXISTS ltree')
    .then(() => knex.schema.createTable(TABLE_NAME, (table) => {
      table.specificType('id', 'ltree').primary();
    }));
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
