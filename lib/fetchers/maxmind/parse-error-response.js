const {get} = require('lodash');
const {BadInputError, ObjectNotFoundError, ServerError, UnknownError} = require('spott-errors');

const DEFAULT_MESSAGE = 'Unknown error fetching IP data.';

const ERRORS_MAP = {
  IP_ADDRESS_INVALID: BadInputError,
  IP_ADDRESS_REQUIRED: BadInputError,
  IP_ADDRESS_RESERVED: BadInputError,
  IP_ADDRESS_NOT_FOUND: ObjectNotFoundError,
  AUTHORIZATION_INVALID: ServerError,
  LICENSE_KEY_REQUIRED: ServerError,
  USER_ID_REQUIRED: ServerError,
  OUT_OF_QUERIES: ServerError,
  PERMISSION_REQUIRED: ServerError
};

const CUSTOM_MESSAGE = {
  AUTHORIZATION_INVALID: DEFAULT_MESSAGE,
  LICENSE_KEY_REQUIRED: DEFAULT_MESSAGE,
  USER_ID_REQUIRED: DEFAULT_MESSAGE,
  OUT_OF_QUERIES: DEFAULT_MESSAGE,
  PERMISSION_REQUIRED: DEFAULT_MESSAGE
};

function parseErrorResponse(error) {
  const data = get(error, 'response.data') || {};
  const {code, error: externalMessage} = data;
  const message = CUSTOM_MESSAGE[code] || externalMessage || DEFAULT_MESSAGE;
  const ErrorModel = ERRORS_MAP[code];
  const response = ErrorModel
    ? new ErrorModel(message)
    : new UnknownError(DEFAULT_MESSAGE);

  return Promise.reject(response);
}

module.exports = parseErrorResponse;
