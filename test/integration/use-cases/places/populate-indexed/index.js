const sinon = require('sinon');
const proxyquire = require('proxyquire');
const database = require(`${ROOT_PATH}/lib/database`);
const {PLACE_ID, UNEXISTENT_PLACE_ID} = require('./constants');

const populateMock = sinon.spy(function({database, place, languages}) {
  return place;
});

const populateIndexed = proxyquire(`${ROOT_PATH}/lib/use-cases/places/populate-indexed`, {
  './populate': populateMock
});

describe('UseCases | Places | .populateIndexed', () => {
  const fixtures = require('./fixtures');

  before(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  describe('Populate an indexedPlace', () => {
    let indexedPlace;
    let expectedPlace;

    before(async () => {
      indexedPlace = await database.indexedPlaces.findById(PLACE_ID);
      expectedPlace = await database.places.findById(PLACE_ID);
    });

    it('should keep all default propierties of the place plus "score"', async () => {
      const result = await populateIndexed({database, indexedPlace});

      const expectedResult = {
        ...expectedPlace,
        score: indexedPlace.score
      };
      expect(result).to.be.eql(expectedResult);
    });

    it('should call populate method correctly', async () => {
      populateMock.resetHistory();

      const languages = ['en', 'it'];
      const result = await populateIndexed({database, indexedPlace, languages});

      expect(result).to.be.an('object');
      expect(result.id).to.be.equal(PLACE_ID);

      const [actualParams] = populateMock.firstCall.args;
      const expectedParams = {database, place: expectedPlace, languages};
      expect(populateMock.callCount).to.be.equal(1);
      expect(actualParams).to.be.eql(expectedParams);
    });
  });

  describe('Failure cases', () => {
    let indexedPlace;

    before(async () => {
      indexedPlace = await database.indexedPlaces.findById(UNEXISTENT_PLACE_ID);
    });

    it('should return null when geonamesPlace is not found', async () => {
      const result = await populateIndexed({database, indexedPlace});
      expect(result).to.be.equal(null);
    });
  });
});

