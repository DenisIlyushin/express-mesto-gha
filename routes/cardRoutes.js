const {
  createCard,
  getAllCards,
  getCard,
  handleLike
} = require('../controllers/card.js');
const cardRouter = require('express').Router();

const {
  CARD_PATH = '/cards',
} = process.env;

cardRouter.post(`${CARD_PATH}`, createCard);
cardRouter.get(`${CARD_PATH}`, getAllCards);
cardRouter.get(`${CARD_PATH}/:id`, getCard);
cardRouter.put(`${CARD_PATH}/:id/likes`, handleLike)
cardRouter.delete(`${CARD_PATH}/:id/likes`, handleLike)

module.exports = cardRouter