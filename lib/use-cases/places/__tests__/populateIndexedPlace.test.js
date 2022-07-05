const populatedIndexedPlaces = require('../populate-indexed-places');
const populateIndexedPlace = require('../populateIndexedPlace');

jest.mock('../populate-indexed-places', () => jest.fn());

const DATABASE = 'DATABASE';
const LANGUAGES = 'LANGUAGES';
const PLACE = 'PLACE';
const POPULATED = 'POPULATED_PLACE';

describe('Use cases | Places | .populateIndexedPlace', () => {
  beforeEach(() => populatedIndexedPlaces.mockClear());

  populatedIndexedPlaces.mockImplementation(() => Promise.resolve([POPULATED]));

  it('calls "populateIndexedPlaces" and returns a single instance', async () => {
    const result = await populateIndexedPlace({ database: DATABASE, languages: LANGUAGES, indexedPlace: PLACE });
    expect(result).toEqual(POPULATED);
    expect(populatedIndexedPlaces).toBeCalledTimes(1);
    expect(populatedIndexedPlaces).toBeCalledWith({
      database: DATABASE,
      languages: LANGUAGES,
      indexedPlaces: [PLACE],
    });
  });
});
