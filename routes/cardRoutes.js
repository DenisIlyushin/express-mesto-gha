const cardRouter = require('express').Router();

const auth = require('../middleware/auth');
const {
  createCard,
  getAllCards,
  handleLike,
  deleteCard,
} = require('../controllers/card');

const {
  CARD_PATH = '/cards',
} = process.env;

cardRouter.post(`${CARD_PATH}`, auth, createCard);
cardRouter.get(`${CARD_PATH}`, auth, getAllCards);
cardRouter.put(`${CARD_PATH}/:id/likes`, auth, handleLike);
cardRouter.delete(`${CARD_PATH}/:id/likes`, auth, handleLike);
cardRouter.delete(`${CARD_PATH}/:id`, auth, deleteCard);

module.exports = cardRouter;
