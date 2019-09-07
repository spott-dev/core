process.env.NODE_ENV = 'test';
require('../config/load');

const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const TestUtils = require('spott-test-utils');
const {postgres} = require('../lib/database/engines');
const ROOT_PATH = path.join(__dirname, '..');

global.testUtils = new TestUtils({postgres});
global.expect = chai.expect;
global.ROOT_PATH = ROOT_PATH;

chai.use(chaiAsPromised);

process.on('unhandledRejection', trace => console.log(trace));
