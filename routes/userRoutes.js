const userRouter = require('express').Router();

const auth = require('../middleware/auth');
const {
  getAllUsers,
  getUser,
  getCurrentUser,
  updateUser,
} = require('../controllers/user');

const {
  USER_PATH = '/users',
} = process.env;

userRouter.get(`${USER_PATH}`, auth, getAllUsers);
userRouter.get(`${USER_PATH}/me`, auth, getCurrentUser);
userRouter.get(`${USER_PATH}/:id`, auth, getUser);
userRouter.patch(`${USER_PATH}/me`, auth, updateUser);
userRouter.patch(`${USER_PATH}/me/avatar`, auth, updateUser);

module.exports = userRouter;
