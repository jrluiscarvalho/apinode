'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
mongoose.connect('mongodb://luis:luis@ds044989.mlab.com:44989/ndstl');

const Product = require('./models/product');
const Customer = require('./models/customer');

const indexRoutes = require('./routes/index');
const productRoute = require('./routes/product');
const customerRoute = require('./routes/customer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', indexRoutes);
app.use('/products', productRoute);
app.use('/customers', customerRoute);

module.exports = app;