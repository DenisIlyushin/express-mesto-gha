const {
  StatusCodes,
} = require('http-status-codes');

const Card = require('../models/card');
const { handleRequestErrors } = require('../utils/handleRequestErrors');
const ForbiddenError = require('../errors/forbiddenError.js');

module.exports.createCard = (req, res, next) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => {
      res
        .status(StatusCodes.CREATED)
        .send(card);
    })
    .catch((error) => {
      handleRequestErrors(
        error,
        next,
        {
          invalidRequestMessage: 'Не удалось создать карточку места. Данные не валидны',
        },
      );
    });
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => {
      res.status(StatusCodes.OK).send(card);
    })
    .catch((error) => {
      handleRequestErrors(error, next);
    });
};

module.exports.handleLike = (req, res, next) => {
  const cardId = req.params.id;
  // проверка типа запроса для определения действия лайка
  let action;
  switch (req.method) {
    case 'PUT':
      action = '$addToSet';
      break;
    case 'DELETE':
      action = '$pull';
      break;
    default:
      action = '$pull';
      break;
  }
  Card.findByIdAndUpdate(
    cardId,
    { [action]: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .populate([{ path: 'likes', model: 'user' }])
    .then((card) => {
      res
        .status(StatusCodes.OK)
        .send(card);
    })
    .catch((error) => {
      handleRequestErrors(
        error,
        next,
        {
          notFoundMessage: `Карточка места с ID ${cardId} не найдена`,
          badRequestMessage: `Карточка места с с ID ${cardId} не валиднa`,
        },
      );
    });
};

module.exports.deleteCard = (req, res, next) => {
  const cardId = req.params.id;

  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (req.user._id !== card.owner.toString()) {
        return Promise.reject(new ForbiddenError('Нельзя удалять чужие карточки'))
      }
      Card.findByIdAndRemove(card._id)
        .orFail()
        .then((card) => {
          res
            .status(StatusCodes.OK)
            .send(card);
        })
        .catch((error) => {
          handleRequestErrors(
            error,
            next,
            {
              notFoundMessage: `Карточка места с ID ${cardId} не найдена`,
              badRequestMessage: `Карточка места с с ID ${cardId} не валиднa`,
            },
          );
        });
    })
    .catch((error) => {
      handleRequestErrors(
        error,
        next,
        {
          notFoundMessage: `Карточка места с ID ${cardId} не найдена`,
          badRequestMessage: `Карточка места с с ID ${cardId} не валиднa`,
        },
      );
    });
};
