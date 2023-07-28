// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const {
  PORT = 3000,
  BASE_PATH,
  MONGODB_URL =  'mongodb://localhost:27017/mestodb '
} = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

const app = express();

// app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});
