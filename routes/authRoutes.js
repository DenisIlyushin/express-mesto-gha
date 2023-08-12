const authRouter = require('express').Router();

const {
  signUp,
  signIn,
} = require('../controllers/auth');

const {
  AUTH_PATH = '',
} = process.env;

authRouter.post(`${AUTH_PATH}/signup`, signUp);
authRouter.post(`${AUTH_PATH}/signin`, signIn);

module.exports = authRouter;
