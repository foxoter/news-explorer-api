require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_URL, PORT, mongooseOptions } = require('./config');
const generalErrorHandler = require('./middlewares/generalErrorHandler');
const { limiter } = require('./middlewares/limiter');
const routes = require('./routes/index');

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:8080',
    'https://foxoter.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(corsOptions));
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose.connect(MONGO_URL, mongooseOptions);
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(generalErrorHandler);
app.listen(PORT);
