const {PLACE_ID_1, PLACE_ID_2} = require('./constants');
const database = require(`${ROOT_PATH}/lib/database`);

describe('Database | IndexedPlacesStore | .upsertMultiple', () => {
  const fixtures = require('./fixtures');
  const [PLACE_1, PLACE_2] = fixtures.indexedPlaces;

  beforeEach(testUtils.resetDatabase);

  describe('when database is empty', () => {
    it('should insert a new item', async () => {
      const existingItem = await database.indexedPlaces.findById(PLACE_ID_1);
      expect(existingItem).to.be.equal(null);

      const response = await database.indexedPlaces.upsertMultiple([PLACE_1, PLACE_2]);
      expect(response).to.be.an('object');
      expect(response.success).to.be.equal(true);
      expect(response.upserted).to.be.equal(2);

      expectPlace(PLACE_ID_1, new Date());
      expectPlace(PLACE_ID_2, new Date());
    });
  });

  describe('when object already exists', () => {
    beforeEach(() => testUtils.insertFixtures(fixtures));

    it('should update fields when the object already is stored', async () => {
      expectPlace(PLACE_ID_1, new Date(0));
      expectPlace(PLACE_ID_2, new Date(0));

      const newPopulation = 123456;
      const updatedItems = [
        {
          ...PLACE_1,
          population: newPopulation,
          updatedAt: undefined
        },
        {
          ...PLACE_2,
          population: newPopulation,
          updatedAt: undefined
        }
      ];
      const response = await database.indexedPlaces.upsertMultiple(updatedItems);
      expect(response).to.be.an('object');
      expect(response.success).to.be.equal(true);
      expect(response.upserted).to.be.equal(2);

      expectPlace(PLACE_ID_1, new Date());
      expectPlace(PLACE_ID_2, new Date());
    });
  });
});

async function expectPlace(id, expectedUpdatedAt) {
  const place = await database.indexedPlaces.findById(id);
  expect(place).to.be.an('object');
  expect(place.id).to.be.equal(id);
  expect(place.updatedAt.getTime()).to.be.closeTo(expectedUpdatedAt.getTime(), 10000);
}
