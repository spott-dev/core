const { PLACE_ID_1, PLACE_ID_2, PLACE_ID_3 } = require('./constants');
const database = require(`${ROOT_PATH}/lib/database`);

describe('Database | Places store | .findByIds', () => {
  const fixtures = require('./fixtures');

  beforeEach(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should find places given multiple ids', async () => {
    const places = await database.places.findByIds([PLACE_ID_1, PLACE_ID_3]);
    expect(places).to.be.an('array');

    const ids = places.map((p) => p.id);
    expect(ids.length).to.be.equal(2);
    expect(ids).to.include(PLACE_ID_1);
    expect(ids).to.include(PLACE_ID_3);
  });

  it('should support fields selection', async () => {
    const fields = ['id', 'geonameId', 'name'];
    const [place] = await database.places.findByIds([PLACE_ID_2], {fields});
    expect(place).to.be.an('object');
    expect(place.id).to.be.equal(PLACE_ID_2);

    const actualFields = Object.keys(place);
    expect(actualFields).to.be.deep.equal(fields);
  });

  it('should throw error when not sending a list of ids', () => {
    return expect(database.places.findByIds()).to.be.rejectedWith('Undefined binding(s)');
  });

  describe('Returning empty', () => {
    const NULL_TEST_CASES = ['NOT_EXISTENT_ID', null, true, 0];

    it('should return empty array when no place exist within the list of ids', async () => {
      const results = await database.places.findByIds(NULL_TEST_CASES);
      expect(results).to.deep.equal([]);
    });
  });
});
