const express = require('express');
require('dotenv').config();
const logger = require('morgan');
const cors = require('cors');
require('./entity/environment-validation');

const exerciseRouter = require('./routes/exercise-router.js');
const categoryRouter = require('./routes/category-router.js');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api/exercise', exerciseRouter);
app.use('/api/category', categoryRouter);

module.exports = app;