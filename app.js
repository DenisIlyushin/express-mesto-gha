const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { StatusCodes } = require('http-status-codes');

const userRouter = require('./routes/userRoutes');
const cardRouter = require('./routes/cardRoutes');
const {
  login,
  createUser,
} = require('./controllers/user');
const {
  returnResponseError,
} = require('./utils/returnResponseError');

const {
  PORT = 3000,
  BASE_PATH = 'http://localhost',
  //                       ! локальная ошибка на рабочем ноуте
  MONGODB_URL = 'mongodb://0.0.0.0:27017/mestodb',
} = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

const app = express();

// middlewares
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64c3bfb7df7e40ff39b8d5ab',
  };
  next();
});

// routers
// todo create auth router?
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .send({
      message: 'URI не найден.',
    });
});
// итоговая обработка ошибки
app.use((error, req, res, next) => {
  returnResponseError(error, res, {});
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Ссылка на сервер');
  // eslint-disable-next-line no-console
  console.log(`${BASE_PATH}:${PORT}`);
});
