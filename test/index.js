process.env.NODE_ENV = 'test';
require('../config/load');

const chai = require('chai');
const testUtils = require('./utils');

global.testUtils = testUtils;
global.expect = chai.expect;

process.on('unhandledRejection', trace => console.log(trace));
