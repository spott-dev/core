const TABLE_NAME = 'geonames_timezones';

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.string('id').primary();
    table.string('country_id').notNullable();
    table.integer('gmt_offset').notNullable();
    table.integer('dst_offset').notNullable();
    table.integer('raw_offset').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index('country_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
