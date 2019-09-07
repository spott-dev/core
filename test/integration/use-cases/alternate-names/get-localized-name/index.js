const database = require(`${ROOT_PATH}/lib/database`);
const getLocalizedName = require(`${ROOT_PATH}/lib/use-cases/alternate-names/get-localized-name`);
const {
  GEONAME_ID_1,
  LANGUAGE_1,
  NAME_1
} = require('./constants');

describe('UseCases | AlternateNames | .getLocalizedName', () => {
  const fixtures = require('./fixtures');

  before(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should return a name given a geonameId and a language', async () => {
    const geonameId = GEONAME_ID_1;
    const language = LANGUAGE_1;
    const expectedName = NAME_1;
    const name = await getLocalizedName({database, geonameId, language});
    expect(name).to.be.equal(expectedName);
  });

  it('should return null if no alternate name is found because language does not exist', async () => {
    const geonameId = GEONAME_ID_1;
    const language = 'NOT_EXISTENT_LANGUAGE';
    const expectedName = null;
    const name = await getLocalizedName({database, geonameId, language});
    expect(name).to.be.equal(expectedName);
  });

  it('should return null if no alternate name is found because geoname id does not exist', async () => {
    const NOT_EXISTENT_GEONAME_ID = 0;
    const language = LANGUAGE_1;
    const expectedName = null;
    const name = await getLocalizedName({database, geonameId: NOT_EXISTENT_GEONAME_ID, language});
    expect(name).to.be.equal(expectedName);
  });
});
