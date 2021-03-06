'use strict';

const repository = require('../repositories/order');
const guid = require('guid');

exports.get = async(req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
    
}

exports.post = async(req, res, next) => {
    let data = {
        customer:'',
        number:'',
        items:[]
    }
    
    try{
        await repository.create({
            customer:req.body.customer,
            number:guid.raw().substring(0,6),
            items:req.body.items
        });
        res.status(201).send({message: 'Pedido cadastrado com sucesso'});
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição', 
            data:e
        });

    }
};