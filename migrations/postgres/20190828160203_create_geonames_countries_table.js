const TABLE_NAME = 'geonames_countries';

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.specificType('id', 'ltree').primary();
    table.integer('geoname_id').notNullable();
    table.string('iso_3').notNullable();
    table.string('iso_numeric').notNullable();
    table.string('fips');
    table.string('name');
    table.string('capital_name');
    table.float('area');
    table.integer('population');
    table.string('continent_id').notNullable();
    table.string('domain');
    table.string('currency_code');
    table.string('currency_name');
    table.string('postal_code_format');
    table.string('postal_code_regex');
    table.specificType('phone_codes', 'text[]').defaultTo('{}');
    table.specificType('languages', 'text[]').defaultTo('{}');
    table.specificType('neighbour_country_ids', 'ltree[]').defaultTo('{}');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index('geoname_id');
    table.index('continent_id');
    table.index('neighbour_country_ids');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
