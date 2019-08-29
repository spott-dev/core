const TABLE_NAME = 'geonames_places';

exports.up = function(knex) {
  return knex
    .raw('CREATE EXTENSION IF NOT EXISTS ltree')
    .then(() => knex.schema.createTable(TABLE_NAME, (table) => {
      table.specificType('id', 'ltree').primary();
      table.integer('geoname_id').notNullable();
      table.string('type').notNullable();
      table.string('name');
      table.string('ascii_name');
      table.specificType('alternate_names', 'text[]').defaultTo('{}');
      table.string('feature_class');
      table.string('feature_code');
      table.string('country_id').notNullable();
      table.string('admin_division_1_id');
      table.string('admin_division_2_id');
      table.integer('population');
      table.float('latitude');
      table.float('longitude');
      table.integer('elevation');
      table.string('timezone_id');
      table.date('geonames_updated_at');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.index('geoname_id');
      table.index('type');
      table.index('name');
      table.index('feature_class');
      table.index('feature_code');
      table.index('country_id');
      table.index('admin_division_1_id');
      table.index('admin_division_2_id');
      table.index('timezone_id');
    }));
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
