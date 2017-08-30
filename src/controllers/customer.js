'use strict';

const ValidatorContract = require('../validators/fluid-validators');
const repository = require('../repositories/customer');

exports.post = (req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.email, 3, 'O email deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.password, 6, 'a senha deve conter pelo menos 6 caracteres');
    
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try{
        const data = await repository.repository.create(req.body);
        res.status(201).send({message: 'Cliente cadastrado com sucesso'});
    }catch(e){
        res.status(400).send({
            message: 'Falha ao cadastrar ciente', 
            data:e
        });

    }
};