const {PLACE_ID_1} = require('./constants');
const database = require(`${ROOT_PATH}/lib/database`);

describe('Database | IndexedPlacesStore | .upsert', () => {
  const fixtures = require('./fixtures');
  const [PLACE_1] = fixtures.indexedPlaces;

  beforeEach(testUtils.resetDatabase);

  describe('when database is empty', () => {
    it('should insert a new item', async () => {
      const existingItem = await database.indexedPlaces.findById(PLACE_ID_1);
      expect(existingItem).to.be.equal(null);

      const newItem = await database.indexedPlaces.upsert(PLACE_1);
      expect(newItem).to.be.an('object');
      expect(newItem.id).to.be.equal(PLACE_ID_1);
      expect(newItem.updatedAt.getTime()).to.be.closeTo(Date.now(), 10000);
    });
  });

  describe('when object already exists', () => {
    beforeEach(() => testUtils.insertFixtures(fixtures));

    it('should update fields when the object already is stored', async () => {
      const existingItem = await database.indexedPlaces.findById(PLACE_ID_1);
      expect(existingItem).to.be.an('object');
      expect(existingItem.id).to.be.equal(PLACE_ID_1);
      expect(existingItem.updatedAt.getTime()).to.be.equal(0);

      const newPopulation = 123456;
      const updatedItem = {
        ...PLACE_1,
        population: newPopulation,
        updatedAt: undefined
      };
      const newItem = await database.indexedPlaces.upsert(updatedItem);
      expect(newItem).to.be.an('object');
      expect(newItem.id).to.be.equal(PLACE_ID_1);
      expect(newItem.population).to.be.equal(newPopulation);
      expect(newItem.updatedAt.getTime()).to.be.closeTo(Date.now(), 10000);
    });
  });
});
