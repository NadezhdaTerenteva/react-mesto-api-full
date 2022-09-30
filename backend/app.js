require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const generalErrorHandler = require('./middlewares/generalErrorHandler');
const { requestLogger } = require('./middlewares/request.log');
const { errorLogger } = require('./middlewares/error.log');

const routes = require('./routes/index');

// Слушаем 3000 порт
const { PORT = 4000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:4000',
    'http://mesto.nadyaterenteva.nomoredomains.sbs',
    'http://api.mesto.nadyaterenteva.nomoredomains.sbs',
    'https://mesto.nadyaterenteva.nomoredomains.sbs',
    'https://api.mesto.nadyaterenteva.nomoredomains.sbs',
    'http://localhost:8080',
  ],
  credentials: true,
};

app.use(cors(corsOptions));
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
