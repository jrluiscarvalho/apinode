'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async() => {
    return await Product
    .find({
        active:true
    }, 'title price slug');
}

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
};