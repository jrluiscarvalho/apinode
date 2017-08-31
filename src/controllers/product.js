'use strict';

const ValidatorContract = require('../validators/fluid-validators');
const repository = require('../repositories/product');

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

exports.getBySlug = async(req, res, next) => {
    try{
        const data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    }catch(e){
        res.status(400).send(e);        
    }
}

exports.getByTag = async(req, res, next) => {
    try{
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    }catch(e){
        res.status(400).send(e);
    }
}

exports.getById = async(req, res, next) => {
    try{
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    }catch(e){
        res.status(400).send(e);
    }

}

exports.post = async(req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');
    
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try{
        const data = await repository.create(req.body);
        res.status(201).send({message: 'Produto cadastrado com sucesso'});
    }catch(e){
        res.status(400).send({
            message: 'Falha ao cadastrar produto', 
            data:e
        });

    }
};


exports.put = async(req,res,next) => {
    try{
        const data = await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto atualizado com sucesso'
        });
    }catch(e){
        res.status(400).send({
            message: 'Falha ao atualizar produto', 
            data:e
        });
    }
};

exports.delete = async(req, res, next) => {
    try{
        const data = await repository.remove(req.body.id)
        res.status(200).send({
            message: 'Produto removido com sucesso'
        });
    }catch(e){
        res.status(400).send({
            message: 'Falha ao remover produto', 
            data:e
        });
    }
};