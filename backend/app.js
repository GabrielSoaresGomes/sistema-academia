const express = require('express');
require('dotenv').config();
const logger = require('morgan');
require('./entity/environment-validation');

const exerciseRouter = require('./routes/exercise-router.js');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api/exercise', exerciseRouter);

module.exports = app;