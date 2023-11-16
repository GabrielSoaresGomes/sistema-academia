const express = require('express');
require('dotenv').config();
const logger = require('morgan');
require('./environment-validation');

const router = require('./router.js');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', router);

module.exports = app;