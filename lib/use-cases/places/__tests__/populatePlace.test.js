const populatedPlaces = require('../populate-places');
const populatePlace = require('../populatePlace');

jest.mock('../populate-places', () => jest.fn());

const DATABASE = 'DATABASE';
const LANGUAGES = 'LANGUAGES';
const PLACE = 'PLACE';
const POPULATED = 'POPULATED_PLACE';

describe('Use cases | Places | .populatePlace', () => {
  beforeEach(() => populatedPlaces.mockClear());

  populatedPlaces.mockImplementation(() => Promise.resolve([POPULATED]));

  it('calls "populatePlaces" and returns a single instance', async () => {
    const result = await populatePlace({ database: DATABASE, languages: LANGUAGES, place: PLACE });
    expect(result).toEqual(POPULATED);
    expect(populatedPlaces).toBeCalledTimes(1);
    expect(populatedPlaces).toBeCalledWith({
      database: DATABASE,
      languages: LANGUAGES,
      places: [PLACE],
    });
  });
});
