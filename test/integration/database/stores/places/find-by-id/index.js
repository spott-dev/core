const {PLACE_ID_1} = require('./constants');
const database = require(`${ROOT_PATH}/lib/database`);

describe('Database | Places store | .findById', () => {
  const fixtures = require('./fixtures');

  beforeEach(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should find a place given its id', async () => {
    const place = await database.places.findById(PLACE_ID_1);
    expect(place).to.be.an('object');
    expect(place.id).to.be.equal(PLACE_ID_1);
  });

  const NULL_TEST_CASES = ['NOT_EXISTENT_ID', null, true, 0];

  NULL_TEST_CASES.forEach(testCase => {
    it(`should return null when no place exist with an id (${testCase})`, async () => {
      const result = await database.places.findById(testCase);
      expect(result).to.be.equal(null);
    });
  });

  it('should throw error when not sending an id', () => {
    return expect(database.places.findById()).to.be.rejectedWith('Undefined binding(s) detected when compiling FIRST query: select * from "places" where "id" = ? limit ?');
  });
});
