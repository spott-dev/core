const sinon = require('sinon');
const proxyquire = require('proxyquire');

const findByQueryAndFilter = sinon.stub().resolves([]);
const findByAutocompleteAndFilter = sinon.stub().resolves([]);

const populateIndexedPlacesMock = sinon.stub();

const getByQuery = proxyquire(`${ROOT_PATH}/lib/use-cases/places/get-by-query`, {
  './populate-indexed-places': populateIndexedPlacesMock
});

const database = {
  indexedPlaces: {
    findByAutocompleteAndFilter,
    findByQueryAndFilter
  }
};

describe('UseCases | Places | .getByQuery', () => {
  beforeEach(() => {
    findByAutocompleteAndFilter.resetHistory();
    findByQueryAndFilter.resetHistory();
    populateIndexedPlacesMock.resetHistory();
  });

  it('should throw error when not sending a valid "searchMethod" parameter', () => {
    const query = 'Place query';
    const params = {
      database,
      query
    };

    return expect(getByQuery(params)).to.be.rejectedWith(Error, 'Invalid searchMethod "undefined". Valids: SIMPLE, AUTOCOMPLETE');
  });

  it('should use .findByAutocompleteAndFilter database method when sending searchMethod = "AUTOCOMPLETE"', async () => {
    const query = 'Place query';

    await getByQuery({
      database,
      query,
      searchMethod: 'AUTOCOMPLETE'
    });

    expect(findByAutocompleteAndFilter.callCount).to.be.equal(1);
    expect(findByQueryAndFilter.callCount).to.be.equal(0);

    const [actualQuery] = findByAutocompleteAndFilter.firstCall.args;
    expect(actualQuery).to.be.equal(query);
  });

  it('should use .findByQueryAndFilter database method when sending searchMethod = "SIMPLE"', async () => {
    const query = 'Place query';

    await getByQuery({
      database,
      query,
      searchMethod: 'SIMPLE'
    });

    expect(findByAutocompleteAndFilter.callCount).to.be.equal(0);
    expect(findByQueryAndFilter.callCount).to.be.equal(1);

    const [actualQuery] = findByQueryAndFilter.firstCall.args;
    expect(actualQuery).to.be.equal(query);
  });

  it('should send query to database method correctly', async () => {
    const query = 'Place query';

    await getByQuery({
      database,
      query,
      searchMethod: 'SIMPLE'
    });

    expect(findByQueryAndFilter.callCount).to.be.equal(1);

    const [actualQuery] = findByQueryAndFilter.firstCall.args;
    expect(actualQuery).to.be.equal(query);
  });

  it('should send filter parameters to database method correctly', async () => {
    const types = ['CITY', 'COUNTRY'];
    const countryIds = ['MX', 'US', 'JP'];
    const adminDivision1Ids = ['US.01'];
    const adminDivision2Ids = ['MX.14.001'];
    const coordinates = {
      latitue: 20,
      longitude: -103,
      accuracyRadiusKm: 10
    };

    await getByQuery({
      database,
      types,
      countryIds,
      adminDivision1Ids,
      adminDivision2Ids,
      coordinates,
      searchMethod: 'SIMPLE'
    });

    expect(findByQueryAndFilter.callCount).to.be.equal(1);

    const expectedFilter = {
      types,
      countryIds,
      adminDivision1Ids,
      adminDivision2Ids,
      coordinates
    };
    const [, actualFilter] = findByQueryAndFilter.firstCall.args;
    expect(actualFilter).to.be.eql(expectedFilter);
  });

  it('should send options parameters to database method correctly', async () => {
    const limit = 5;
    const skip = 20;

    await getByQuery({
      database,
      limit,
      skip,
      searchMethod: 'SIMPLE'
    });

    expect(findByQueryAndFilter.callCount).to.be.equal(1);

    const expectedOptions = {
      limit,
      skip,
      fields: ['id', 'score']
    };
    const [, , actualOptions] = findByQueryAndFilter.firstCall.args;
    expect(actualOptions).to.be.eql(expectedOptions);
  });

  it('should populate indexedPlace correctly', async () => {
    const INDXD_PLACE_1 = {id: 1, score: 100};
    const INDXD_PLACE_2 = {id: 2, score: 50};
    const INDXD_PLACE_3 = {id: 3, score: 25};
    const languages = ['en', 'it'];
    const searchMethod = 'SIMPLE';

    findByQueryAndFilter.resolves([INDXD_PLACE_1, INDXD_PLACE_2, INDXD_PLACE_3]);

    await getByQuery({database, languages, searchMethod});

    expect(populateIndexedPlacesMock.callCount).to.be.equal(1);
    expect(populateIndexedPlacesMock.args[0]).to.be.eql([{
      database,
      languages,
      indexedPlaces: [INDXD_PLACE_1, INDXD_PLACE_2, INDXD_PLACE_3],
    }]);
  });

  it('should return populated indexedPlaced', async () => {
    const PPLTD_PLACE_1 = 'PLACE_1';
    const PPLTD_PLACE_2 = 'PLACE_2';
    const PPLTD_PLACE_3 = 'PLACE_3';
    const searchMethod = 'SIMPLE';

    findByQueryAndFilter.resolves([1, 2, 3]);

    populateIndexedPlacesMock.onCall(0).returns([
      PPLTD_PLACE_1,
      PPLTD_PLACE_2,
      PPLTD_PLACE_3,
    ]);

    const results = await getByQuery({database, searchMethod});

    expect(populateIndexedPlacesMock.callCount).to.be.equal(1);

    const expectedResults = [
      PPLTD_PLACE_1,
      PPLTD_PLACE_2,
      PPLTD_PLACE_3
    ];
    expect(results).to.be.eql(expectedResults);
  });
});
