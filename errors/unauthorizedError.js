const {
  StatusCodes,
} = require('http-status-codes');

const ExtendedError = require('./extendedError');

class UnauthorizedError extends ExtendedError {
  constructor(message, details = null) {
    super(message, details);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
