const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const cardRouter = require('./routes/cardRoutes');
const { returnErrorAsResponse } = require('./errors/returnErrorAsResponse');
const NotFoundError = require('./errors/classes/notFoundError');
const { requestLogger, errorLogger } = require('./middleware/logger');
const cors = require('./middleware/cors');

const {
  PORT = 3000,
  BASE_PATH = 'http://localhost',
  MONGODB_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

const app = express();

// middlewares
app.use(express.json());
app.use(cors);
// логгирование запроса
app.use(requestLogger);
// routers
app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('URI не найден'));
});
// логгирование ошибки
app.use(errorLogger);
// итоговая обработка ошибки
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  returnErrorAsResponse(error, res, {});
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Ссылка на сервер');
  // eslint-disable-next-line no-console
  console.log(`${BASE_PATH}:${PORT}`);
});
