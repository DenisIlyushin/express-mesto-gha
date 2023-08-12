const mongoose = require('mongoose');

const UnauthorizedError = require('../errors/unauthorizedError');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const UnknownError = require('../errors/unknownError');
const ForbiddenError = require('../errors/forbiddenError.js');
const ConflictError = require('../errors/conflictError.js');

const defaults = {
  notFoundMessage: 'Объект не найден',
  badRequestMessage: 'ID объекта не валидный',
  conflictMessage: 'Такой объект уже существует',
  invalidRequestMessage: 'Переданные данные не валидны',
  unauthorizedMessage: 'Доступ запрещен',
  forbiddenMessage: 'Операция запрещена',
  defaultMessage: 'Непредвиденная ошибка сервера',
};

module.exports.handleRequestErrors = (
  error,
  next,
  config,
) => {
  // установка необходимых сообщений
  const messages = {
    ...defaults,
    ...config,
  };
  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    next(new NotFoundError(messages.notFoundMessage, error.message));
  } else if (error.code === 11000) {
    next(new ConflictError(messages.conflictMessage, error.message));
  } else if (error instanceof mongoose.Error.CastError) {
    next(new BadRequestError(messages.conflictError, error.message));
  } else if (error instanceof mongoose.Error.ValidationError) {
    next(new BadRequestError(messages.invalidRequestMessage, error.message));
  } else if (error instanceof UnauthorizedError) {
    next(new UnauthorizedError(messages.unauthorizedMessage, error.message));
  } else if (error instanceof ForbiddenError) {
    next(new ForbiddenError(messages.unauthorizedMessage, error.message));
  } else {
    next(new UnknownError(messages.defaultMessage, error.message));
  }
};
