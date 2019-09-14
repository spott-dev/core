const {IP_1, IP_V6_1} = require('./constants');
const database = require(`${ROOT_PATH}/lib/database`);

describe('Database | IpRelations store | .findByIp', () => {
  const fixtures = require('./fixtures');

  before(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should find an ipRelation given its ip', async () => {
    const ipRelation = await database.ipRelations.findByIp(IP_1);
    expect(ipRelation).to.be.an('object');
    expect(ipRelation.ip).to.be.equal(IP_1);
  });

  it('should work with IPv6 addresses', async () => {
    const ipRelation = await database.ipRelations.findByIp(IP_V6_1);
    expect(ipRelation).to.be.an('object');
    expect(ipRelation.ip).to.be.equal(IP_V6_1);
  });

  it('should throw error when not sending an id', () => {
    const expectedMessage = 'Undefined binding(s) detected when compiling FIRST query: select * from "ip_relations" where "ip" = ? limit ?';
    return expect(database.ipRelations.findByIp()).to.be.rejectedWith(expectedMessage);
  });

  describe('Returning null', () => {
    const NOT_EXISTENT_IP = '0.0.0.0';
    const NULL_TEST_CASES = [NOT_EXISTENT_IP, null];

    NULL_TEST_CASES.forEach(testCase => {
      it(`should return null when no ipRelation exist with an ip (${testCase})`, async () => {
        const result = await database.ipRelations.findByIp(testCase);
        expect(result).to.be.equal(null);
      });
    });
  });

  describe('Throwing error when ip is invalid', () => {
    const NULL_TEST_CASES = [true, 0, 'invalid input'];

    NULL_TEST_CASES.forEach(testCase => {
      it(`should throw error when input ip is (${testCase})`, async () => {
        const expectedMessage = `select * from "ip_relations" where "ip" = $1 limit $2 - invalid input syntax for type inet: "${testCase}"`;
        return expect(database.ipRelations.findByIp(testCase)).to.be.rejectedWith(expectedMessage);
      });
    });
  });
});
