const dotenv = require('dotenv');
const path = require('path');
const ENVIRONMENTS = {
  TEST: 'test',
  DEVELOPMENT: 'development',
  PRODUCTION: 'production'
};
const DEFAULT_ENVIRONMENT = ENVIRONMENTS.DEVELOPMENT;

const getLocalConfig = () => {
  const nodeEnv = getEnvironment();
  loadEnvironmentVariables(nodeEnv);
};

function getEnvironment() {
  const isValid = Object.values(ENVIRONMENTS).includes(process.env.NODE_ENV);
  process.env.NODE_ENV = isValid ? process.env.NODE_ENV : DEFAULT_ENVIRONMENT;
  return process.env.NODE_ENV;
}

function loadEnvironmentVariables(nodeEnv) {
  const envPath = path.join('.env', nodeEnv);
  return dotenv.config({path: envPath});
}

module.exports = getLocalConfig();
