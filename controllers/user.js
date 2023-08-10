const {
  StatusCodes,
} = require('http-status-codes');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { handleError } = require('../utils/handleError');

module.exports.createUser = (req, res) => {
  const {
    email, name, about, avatar,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      res
        .status(StatusCodes.CREATED)
        .send({
          _id: user._id,
          email: user.email,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        });
    })
    .catch((error) => {
      handleError(error, res, {
        invalidRequestMessage: 'Не удалось создать пользователя. Данные не валидны',
      });
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((result) => {
      res.status(StatusCodes.OK).send(result);
    })
    .catch((error) => {
      handleError(error, res);
    });
};

module.exports.getUser = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user);
    })
    .catch((error) => {
      handleError(error, res, {
        notFoundMessage: `Пользователь с ID ${userId} не найден`,
        badRequestMessage: `Пользователь с ID ${userId} не валиден`,
      });
    });
};

module.exports.updateUser = (req, res) => {
  const userId = req.user._id;

  // проверка обновляемых параметров по пути запроса
  let userInfo;
  if (req.path.includes('avatar')) {
    userInfo = { avatar: req.body.avatar };
  } else {
    userInfo = {
      name: req.body.name,
      about: req.body.about,
    };
  }

  User.findByIdAndUpdate(userId, userInfo, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail()
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user);
    })
    .catch((error) => {
      handleError(error, res, {
        notFoundMessage: `Пользователь с ID ${userId} не найден`,
        badRequestMessage: `Пользователь с ID ${userId} не валиден`,
        // invalidRequestMessage: 'Переданные данные не валидны',
      });
    });
};
