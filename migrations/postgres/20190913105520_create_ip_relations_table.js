const TABLE_NAME = 'ip_relations';
const PLACES_TABLE_NAME = 'geonames_places';

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.specificType('ip', 'inet').primary();
    table.specificType('place_id', 'ltree');
    table.timestamp('expires_at').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index('place_id');
    table.foreign('place_id').onDelete('CASCADE').references(`${PLACES_TABLE_NAME}.id`);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
