const User = require('../models/user');
const {
  StatusCodes
} = require('http-status-codes');

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res
        .status(StatusCodes.CREATED)
        .send(user)
    })
    .catch((error) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
          message: error.message ? error.message : 'Непредвиденная ошибка сервера'
        })
    })
}

module.exports.getAllUsers = (req, res) => {
  User.find({})
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

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user)
    })
    .catch((error) => {
      if (e.name = 'NotFound') {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send({
            message: error.message ? error.message : 'Пользователь с таким ID не найден'
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