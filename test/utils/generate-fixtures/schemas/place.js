const {OBJECT, PLACE_ID, DATE, INTEGER} = require('../types');

const PLACE_SCHEMA = OBJECT(
  {
    id: PLACE_ID,
    population: INTEGER(0),
    createdAt: DATE,
    updatedAt: DATE
  },
  [
    'id', 'createdAt', 'updatedAt'
  ]
);

module.exports = PLACE_SCHEMA;
