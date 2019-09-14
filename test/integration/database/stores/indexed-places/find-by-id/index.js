const {PLACE_ID_1} = require('./constants');
const database = require(`${ROOT_PATH}/lib/database`);

describe('Database | IndexedPlacesStore | .findById', () => {
  const fixtures = require('./fixtures');

  before(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should find a place given its id', async () => {
    const place = await database.indexedPlaces.findById(PLACE_ID_1);
    expect(place).to.be.an('object');
    expect(place.id).to.be.equal(PLACE_ID_1);
  });

  it('should support fields selection', async () => {
    const fields = ['id', 'geonameId', 'names'];
    const place = await database.indexedPlaces.findById(PLACE_ID_1, {fields});
    expect(place).to.be.an('object');
    expect(place.id).to.be.equal(PLACE_ID_1);

    const actualFields = Object.keys(place);
    expect(actualFields).to.be.include.all.members(fields);
  });

  it('should throw error when not sending an id', () => {
    return expect(database.indexedPlaces.findById()).to.be.rejectedWith('Missing required parameter: id');
  });

  describe('Returning null', () => {
    const NULL_TEST_CASES = ['NOT_EXISTENT_ID', true, 0];

    NULL_TEST_CASES.forEach(testCase => {
      it(`should return null when no place exist with an id (${testCase})`, async () => {
        const result = await database.indexedPlaces.findById(testCase);
        expect(result).to.be.equal(null);
      });
    });
  });
});
