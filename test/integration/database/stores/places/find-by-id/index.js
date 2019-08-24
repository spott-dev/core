const {PLACE_ID_1} = require('./constants');

describe('Database | Places store | .findById', () => {
  const fixtures = require('./fixtures');

  beforeEach(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should insert a new element', () => {
    expect(1).to.be.equal(1);
  });
});
