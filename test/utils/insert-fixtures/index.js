const assert = require('assert');
const insertPostgresFixtures = require('./insert-postgres-fixtures');

const POSTGRES = 'postgres';
const FIXTURES_CONFIG = {
  geonamesPlaces: {
    storage: POSTGRES,
    collection: 'geonames_places'
  }
};

function insertFixtures(data) {
  return Object.keys(data).reduce(async (promise, fixtureType) => {
    await promise;
    const config = FIXTURES_CONFIG[fixtureType];
    assert(config, `Fixture type "${fixtureType}" does not exist in config`);

    const {storage, collection} = config;
    const fixtures = data[fixtureType];
    if (storage === POSTGRES) return insertPostgresFixtures(fixtures, collection);
  }, Promise.resolve());
}

module.exports = insertFixtures;
