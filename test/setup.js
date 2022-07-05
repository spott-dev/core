process.env.NODE_ENV = 'test';
require('../config/load');

const path = require('path');
const TestUtils = require('spott-test-utils');
const {engines} = require('../lib/database');
const ROOT_PATH = path.join(__dirname, '..');

global.testUtils = new TestUtils({engines});
global.ROOT_PATH = ROOT_PATH;

process.on('unhandledRejection', trace => console.log(trace));
