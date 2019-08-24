const {random} = require('lodash');
const FixtureGenerator = require('fixtures-generator');
const schemas = require('./schemas');

const options = {
  optionalsProbability: random(0.3, 0.7) // 0.5 ±0.2
};

const fixturesGenerator = new FixtureGenerator(schemas, options);
const generateFixtures = args => fixturesGenerator.generate(args);

module.exports = generateFixtures;
