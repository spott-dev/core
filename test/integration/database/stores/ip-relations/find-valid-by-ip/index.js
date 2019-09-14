const {IP_1, IP_2} = require('./constants');
const database = require(`${ROOT_PATH}/lib/database`);

describe('Database | IpRelations store | .findValidByIp', () => {
  const fixtures = require('./fixtures');

  before(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should find an ipRelation with expiresAt date in the future', async () => {
    const ipRelation = await database.ipRelations.findValidByIp(IP_1);
    expect(ipRelation).to.be.an('object');
    expect(ipRelation.ip).to.be.equal(IP_1);
  });

  it('should return null when a ipRelation exists but expiresAt date is in the past', async () => {
    const ipRelation = await database.ipRelations.findValidByIp(IP_2);
    expect(ipRelation).to.be.equal(null);

    const invalidIpRelation = await database.ipRelations.findByIp(IP_2);
    expect(invalidIpRelation).to.be.an('object');
    expect(invalidIpRelation.ip).to.be.equal(IP_2);
  });
});
