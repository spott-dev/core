const database = require(`${ROOT_PATH}/lib/database`);
const getByQuery = require(`${ROOT_PATH}/lib/use-cases/places/get-by-query`);
const {PLACE_ID} = require('./constants');

describe('UseCases | Places | .getByQuery', () => {
  const fixtures = require('./fixtures');

  before(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  describe('Using "SIMPLE" searchMethod', () => {
    const searchMethod = 'SIMPLE';

    it('should return a place found by a query matching its name', async () => {
      const query = 'Guadalajara';

      const results = await getByQuery({database, query, searchMethod});
      expect(results).to.be.an('array');
      expect(results.length).to.be.equal(1);

      const [place] = results;
      expect(place).to.be.an('object');
      expect(place.id).to.be.equal(PLACE_ID);
    });

    it('should return an empty array when query does not match any place', async () => {
      const query = 'NOT_MATCHING_QUERY';

      const results = await getByQuery({database, query, searchMethod});
      expect(results).to.be.eql([]);
    });
  });

  describe('Using "AUTOCOMPLETE" searchMethod', () => {
    const searchMethod = 'AUTOCOMPLETE';

    it('should return a place found by a query matching its prefix', async () => {
      const query = 'Guad';

      const results = await getByQuery({database, query, searchMethod});
      expect(results).to.be.an('array');
      expect(results.length).to.be.equal(1);

      const [place] = results;
      expect(place).to.be.an('object');
      expect(place.id).to.be.equal(PLACE_ID);
    });

    it('should return an empty array when query does not match any place with prefix', async () => {
      const query = 'WONT_FIND';

      const results = await getByQuery({database, query, searchMethod});
      expect(results).to.be.eql([]);
    });
  });
});
