require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const generalErrorHandler = require('./middlewares/generalErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/request.log');

const routes = require('./routes/index');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger); // подключаем логгер запросов, до роутов
app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок, до обработчиков ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(generalErrorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
