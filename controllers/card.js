const Card = require('../models/card');
const {
  StatusCodes
} = require('http-status-codes');
const mongoose = require('mongoose');
const itemNotFound = require('../errors/errors.js');

module.exports.createCard = (req, res) => {
  Card.create({
    ...req.body,
    owner: req.user._id
  })
    .then((user) => {
      res
        .status(StatusCodes.CREATED)
        .send(user)
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send({
            message: `Не удалось создать карточку места. Данные не валидны`,
            details: error.message ? error.message : ''
          })
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({
            message: error.message ? error.message : 'Непредвиденная ошибка сервера'
          })
      }
    })
}

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((result) => {
      res.status(StatusCodes.OK).send(result)
    })
    .catch((error) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
          message: error.message ? error.message : 'Непредвиденная ошибка сервера'
        })
    })
}

module.exports.getCard = (req, res) => {
  const cardId = req.params.id
  Card.findById(cardId)
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user)
    })
    .catch((error) => {
      console.log(error)
      if (error instanceof mongoose.Error.CastError) {
        res
          .status(StatusCodes.NOT_FOUND)
          .send({
            message: `Карточка места с ID ${cardId} не найдена`,
            details: error.message ? error.message : ''
          })
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({
            message: error.message ? error.message : 'Непредвиденная ошибка сервера'
          })
      }
    })
}

module.exports.handleLike = (req, res) => {
  let action = ''
  switch (req.method) {
    case 'PUT':
      action = '$addToSet';
      break
    case 'DELETE':
      action = '$pull';
      break
  }

  Card.findByIdAndUpdate(
    req.params.id,
    { [action]: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
    throw itemNotFound(
      `Информацию о карточке места невозможно обновить.
       Карточка не найдена`
    )
  })
    .populate([{ path: 'likes', model: 'user' }])
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user)
    })
    .catch((error) => {
      console.log(error)
      if (error instanceof mongoose.Error.CastError) {
        res
          .status(StatusCodes.NOT_FOUND)
          .send({
            message: `Карточка не найдена.`,
            details: error.message ? error.message : ''
          })
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({
            message: error.message ? error.message : 'Непредвиденная ошибка сервера'
          })
      }
    })
}