'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
mongoose.connect('mongodb://luis:luis@ds044989.mlab.com:44989/ndstl');

const Product = require('./models/product');

const indexRoutes = require('./routes/index');
const productRoute = require('./routes/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', indexRoutes);
app.use('/products', productRoute);

module.exports = app;