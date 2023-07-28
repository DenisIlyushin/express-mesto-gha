const mongoose = require('mongoose');
const {StatusCodes} = require('http-status-codes');

module.exports.checkIdValidity = (id, response) => {
  if (!mongoose.isValidObjectId(id)) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .send({
        message: `ID ${id} не валиден`,
      })
    return false
  }
  return true
}