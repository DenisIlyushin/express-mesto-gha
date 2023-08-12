const {
  StatusCodes,
} = require('http-status-codes');

const ExtendedError = require('./extendedError');

class BadRequestError extends ExtendedError {
  constructor(message, details = null) {
    super(message, details);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
