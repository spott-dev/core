const sinon = require('sinon');
const proxyquire = require('proxyquire');
const database = require(`${ROOT_PATH}/lib/database`);
const {PLACE_ID, UNEXISTENT_PLACE_ID} = require('./constants');

const populatePlacesMock = sinon.spy(function({database, languages, places}) {
  return places;
});

const populateIndexedPlaces = proxyquire(`${ROOT_PATH}/lib/use-cases/places/populate-indexed-places`, {
  './populate-places': populatePlacesMock
});

describe('UseCases | Places | .populateIndexedPlaces', () => {
  const fixtures = require('./fixtures');

  before(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  describe('Populate an populateIndexedPlaces', () => {
    let indexedPlace;
    let expectedPlace;

    before(async () => {
      indexedPlace = await database.indexedPlaces.findById(PLACE_ID);
      expectedPlace = await database.places.findById(PLACE_ID);
    });

    it('should keep all default properties of the place plus "score"', async () => {
      const [result] = await populateIndexedPlaces({database, indexedPlaces: [indexedPlace]});

      const expectedResult = {
        ...expectedPlace,
        score: indexedPlace.score
      };
      expect(result).to.be.eql(expectedResult);
    });

    it('should call populate method correctly', async () => {
      populatePlacesMock.resetHistory();

      const languages = ['en', 'it'];
      const [result] = await populateIndexedPlaces({database, languages, indexedPlaces: [indexedPlace]});

      expect(result).to.be.an('object');
      expect(result.id).to.be.equal(PLACE_ID);

      const [actualParams] = populatePlacesMock.firstCall.args;
      const expectedParams = { database, languages, places: [expectedPlace] };
      expect(populatePlacesMock.callCount).to.be.equal(1);
      expect(actualParams).to.be.eql(expectedParams);
    });
  });

  describe('Failure cases', () => {
    let indexedPlace;

    before(async () => {
      indexedPlace = await database.indexedPlaces.findById(UNEXISTENT_PLACE_ID);
    });

    it('should return an empty array when geonamesPlaces are not found', async () => {
      const results = await populateIndexedPlaces({database, indexedPlaces: [indexedPlace]});
      expect(results).to.deep.equal([]);
    });
  });
});

