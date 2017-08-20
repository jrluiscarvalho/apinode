'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');  
const ValidatorContract = require('../validators/fluent-validator');
const repository = require('../repositories/product');

exports.get = (req, res, next) => {
    Product
    .find({
        active:true
    }, 'title price slug')
    .then(data => {
        res.status(200).send(data);
    })
    .catch(e => {
        res.status(400).send(e);        
    });
}

exports.getBySlug = (req, res, next) => {
    Product
    .find({
        slug: req.params.slug,
        active:true
    }, 'title price slug')
    .then(data => {
        res.status(200).send(data);
    })
    .catch(e => {
        res.status(400).send(e);        
    });
}

exports.getByTag = (req, res, next) => {
    Product
    .find({
        tags: req.params.tag,
        active:true
    }, 'title price slug tags')
    .then(data => {
        res.status(200).send(data);
    })
    .catch(e => {
        res.status(400).send(e);        
    });
}

exports.getById = (req, res, next) => {
    Product
    .findById(req.params.id)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(e => {
        res.status(400).send(e);        
    });
}

exports.post = (req, res, next) => {
    
    let contract = new ValidatorContract();
    
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');
    
    let Product = new Product(req.body);
    Product
        .save()
        .then(x=>{
            res.status(201).send({message: 'Produto cadastrado com sucesso'});
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar produto', 
                data:e
            });
        });
    
};


exports.put = (req,res,next) => {
    Product
        .findByIdAndUpdate(req.params.id,{
            $set:{
                tags:req.body.tags,
            }
        }).then(x=>{
            res.status(200).send({
                message: 'Produto atualizado com sucesso'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar produto', 
                data:e
            });
        });

};
  
exports.delete = (req, res, next) => {
    Product
        .findByIdAndRemove(req.body.id)
        .then(x=>{
            res.status(200).send({
                message: 'Produto removido com sucesso'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao remover produto', 
                data:e
            });
        });
};