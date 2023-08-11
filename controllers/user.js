const {
  StatusCodes,
} = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { handleRequestErrors } = require('../utils/handleRequestErrors');

const { JWT_SECRET = 'b1gSecret' } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    email, name, about, avatar, password,
  } = req.body;
  bcrypt.hash(password, 10)
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
      handleRequestErrors(
        error,
        next,
        {
          invalidRequestMessage: 'Не удалось создать пользователя. Данные не валидны',
        },
      );
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCreds(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      // res.cookie('JWT', JSON.stringify({ token }), {
      //   secure: false,
      //   httpOnly: true,
      // });
      res.send({ token });
    })
    .catch((error) => {
      handleRequestErrors(
        error,
        next,
        {
          unauthorizedMessage: 'Невозможно предоставить токен для пользователя',
        },
      );
    });
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((result) => {
      res.status(StatusCodes.OK).send(result);
    })
    .catch((error) => {
      handleRequestErrors(error, next);
    });
};

module.exports.getUser = (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user);
    })
    .catch((error) => {
      handleRequestErrors(
        error,
        next,
        {
          notFoundMessage: `Пользователь с ID ${userId} не найден`,
          badRequestMessage: `Пользователь с ID ${userId} не валиден`,
        },
      );
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user);
    })
    .catch((error) => {
      handleRequestErrors(
        error,
        next,
        {
          notFoundMessage: `Пользователь с ID ${userId} не найден`,
          badRequestMessage: `Пользователь с ID ${userId} не валиден`,
        },
      );
    });
};

module.exports.updateUser = (req, res, next) => {
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
      handleRequestErrors(
        error,
        next,
        {
          notFoundMessage: `Пользователь с ID ${userId} не найден`,
          badRequestMessage: `Пользователь с ID ${userId} не валиден`,
        },
      );
    });
};
