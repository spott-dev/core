const {GEONAME_ID_1, GEONAME_ID_2, GEONAME_ID_3} = require('./constants');
const database = require(`${ROOT_PATH}/lib/database`);

const ALL_GEONAME_IDS = [
  GEONAME_ID_1,
  GEONAME_ID_2,
  GEONAME_ID_3
];

describe('Database | Places store | .getAllGeonameIds', () => {
  const fixtures = require('./fixtures');

  beforeEach(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should find a place given its id', async () => {
    const geonameIds = await database.places.getAllGeonameIds();
    expect(geonameIds).to.be.an('array');
    expect(geonameIds).to.contain(...ALL_GEONAME_IDS);
  });
});
