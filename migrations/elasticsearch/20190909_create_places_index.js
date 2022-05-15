require('../../config/load');
const {createIndex} = require('./utils');
const {elasticsearch} = require('../../lib/database/engines');

const COLLECTION = 'places';
const NOT_ANALYZED_INDEX_STRING = {type: 'keyword'};
const INTEGER = {type: 'integer'};
const GEO_POINT = {type: 'geo_point'};
const DATE = {type: 'date'};

const AUTOCOMPLETE_STRING = {
  type: 'search_as_you_type',
  norms: false
};

const NAMES = {
  type: 'text',
  norms: false,
  fields: {
    raw: NOT_ANALYZED_INDEX_STRING,
    autocomplete: AUTOCOMPLETE_STRING
  }
};

const POLITICAL_DIVISION = {
  properties: {
    id: NOT_ANALYZED_INDEX_STRING,
    code: NOT_ANALYZED_INDEX_STRING,
    geonameId: INTEGER,
    names: NAMES
  }
};

const PLACES_MAPPING = {
  properties: {
    id: NOT_ANALYZED_INDEX_STRING,
    code: NOT_ANALYZED_INDEX_STRING,
    geonameId: INTEGER,
    population: INTEGER,
    elevation: INTEGER,
    type: NOT_ANALYZED_INDEX_STRING,
    names: NAMES,
    coordinates: GEO_POINT,
    timezoneId: NOT_ANALYZED_INDEX_STRING,
    country: POLITICAL_DIVISION,
    adminDivision1: POLITICAL_DIVISION,
    adminDivision2: POLITICAL_DIVISION,
    updatedAtField: DATE
  }
};

createIndex({
  elasticsearch,
  index: elasticsearch.getIndex(COLLECTION),
  mapping: PLACES_MAPPING
})
  .then(() => console.log('DONE'))
  .catch(error => console.log('ERROR', JSON.stringify(error, null, 2)));
