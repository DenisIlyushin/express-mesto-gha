const {
  StatusCodes,
} = require('http-status-codes');

const ExtendedError = require('./extendedError');

class NotFoundError extends ExtendedError {
  constructor(message, details = null) {
    super(message, details);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
