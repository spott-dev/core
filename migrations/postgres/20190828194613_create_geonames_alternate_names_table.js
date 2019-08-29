const TABLE_NAME = 'geonames_alternate_names';
const PLACES_TABLE_NAME = 'geonames_places';

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.integer('id').primary();
    table.integer('geoname_id').notNullable();
    table.string('name');
    table.string('language');
    table.boolean('is_preferred').notNullable();
    table.boolean('is_short').notNullable();
    table.boolean('is_colloquial').notNullable();
    table.boolean('is_historic').notNullable();
    table.integer('used_from');
    table.integer('used_to');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index('geoname_id');
    table.index('name');
    table.index('language');

    table.foreign('geoname_id').references(`${PLACES_TABLE_NAME}.geoname_id`);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
