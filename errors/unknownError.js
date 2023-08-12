const {
  StatusCodes,
} = require('http-status-codes');

const ExtendedError = require('./extendedError');

class UnknownError extends ExtendedError {
  constructor(message, details = null) {
    super(message, details);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

module.exports = UnknownError;
