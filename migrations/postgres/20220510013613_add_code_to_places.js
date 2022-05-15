const TABLE_NAME = 'geonames_places';
const COLUMN_NAME = 'code';

exports.up = function(knex) {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.specificType(COLUMN_NAME, 'ltree');
    table.index(COLUMN_NAME);
    table.renameColumn('country_id', 'country_code');
    table.renameColumn('admin_division_1_id', 'admin_division_1_code');
    table.renameColumn('admin_division_2_id', 'admin_division_2_code');
  });
};

exports.down = function(knex) {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
    table.renameColumn('country_code', 'country_id');
    table.renameColumn('admin_division_1_code', 'admin_division_1_id');
    table.renameColumn('admin_division_2_code', 'admin_division_2_id');
  });
};
