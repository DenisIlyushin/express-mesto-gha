const mongoose = require('mongoose');

const {
  StatusCodes
} = require('http-status-codes');

module.exports.handleError = (
  error,
  res,
  config = {
    notFoundMessage: `Объект не найден`,
    badRequestMessage: `ID объекта не валидный`,
    invalidRequestMessage: `Переданные данные не валидны`,
    defaultMessage: `Непредвиденная ошибка сервера`
  }
) => {
  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send({
        message: config.notFoundMessage,
        details: error.message ? error.message : ''
      })
  } else if (error instanceof mongoose.Error.CastError) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({
        message: config.badRequestMessage,
        details: error.message ? error.message : ''
      })
  } else if (error instanceof mongoose.Error.ValidationError) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({
        message: config.invalidRequestMessage,
        details: error.message ? error.message : ''
      })
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        message: config.defaultMessage,
        details: error.message ? error.message : ''
      })
  }
}