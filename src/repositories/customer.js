'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const authService = require('../services/auth-service');

exports.get = async() => {
    return await Customer
    .find({
        active:true
    }, 'title price slug');
}

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
};

exports.authenticate = async(data) => {
    const res = await Customer.findOne({
        email:data.email,
        password:data.password
    });
    return res;
}

exports.post = async(req, res, next) => {
    try{
        const customer = await repository.authenticate({
            email:req.body.email, 
            password:md5(req.body.password + global.SALT_KEY)
        });

        const token = authService.generateToken({
            email:customer.email,
            name:customer.name
        });

        res.status(201).send({
            token:token,
            data:{
                email:customer.email,
                name:customer.name
            }
        });
        
    }catch(e){
        res.status(400).send({
            message: 'Falha ao cadastrar produto', 
            data:e
        });

    }
};