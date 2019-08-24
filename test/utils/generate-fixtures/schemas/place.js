const {OBJECT, PLACE_ID} = require('../types');

const PLACE_SCHEMA = OBJECT(
  {
    id: PLACE_ID
  },
  [
    'id'
  ]
);

module.exports = PLACE_SCHEMA;
