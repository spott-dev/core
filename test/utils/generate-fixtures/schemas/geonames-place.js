const {OBJECT, COUNTRY_ID, PLACE_ID, DATE, INTEGER, FLOAT, ENUM, STRING, ARRAY} = require('../types');

const VALID_TYPES = ['CITY', 'ADMIN_DIVISION_1', 'ADMIN_DIVISION_2', 'COUNTRY'];
const VALID_FEATURE_CLASSES = ['A', 'P'];
const VALID_FEATURE_CODES = [
  'PCL', 'PCLD', 'PCLF', 'PCLI', 'PCLIX', 'PCLS', 'PPL', 'PPLA', 'PPLA2',
  'PPLA3', 'PPLA4', 'PPLA5', 'PPLC', 'PPLCH', 'PPLF', 'PPLG', 'PPLH',
  'PPLL', 'PPLQ', 'PPLR', 'PPLS', 'PPLW', 'PPLX', 'STLMT'
];

const GEONAMES_PLACE_SCHEMA = OBJECT(
  {
    id: PLACE_ID,
    geonameId: INTEGER(0, 100000000),
    type: ENUM(VALID_TYPES),
    name: STRING,
    asciiName: STRING,
    alternateNames: ARRAY(STRING),
    featureClass: ENUM(VALID_FEATURE_CLASSES),
    featureCode: ENUM(VALID_FEATURE_CODES),
    countryId: COUNTRY_ID,
    adminDivision1Id: PLACE_ID,
    adminDivision2Id: PLACE_ID,
    population: INTEGER(0),
    latitude: FLOAT(-90, 90),
    longitude: FLOAT(-180, 180),
    elevation: INTEGER(0),
    timezoneId: STRING,
    geonamesUpdatedAt: DATE,
    createdAt: DATE,
    updatedAt: DATE
  },
  [
    'id', 'geonameId', 'type', 'countryId',
    'geonamesUpdatedAt', 'createdAt', 'updatedAt'
  ]
);

module.exports = GEONAMES_PLACE_SCHEMA;
