'use strict';

const ValidatorContract = require('../validators/fluid-validators');
const repository = require('../repositories/customer');
const md5 = require('md5');
const authService = require('../services/auth-service');

exports.post = async(req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.email, 3, 'O email deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.password, 6, 'a senha deve conter pelo menos 6 caracteres');
    
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try{
        const data = await repository.create({
            name:req.body.name,
            email:req.body.email,
            password:md5(req.body.password + global.SALT_KEY)
        });
        res.status(201).send({message: 'Cliente cadastrado com sucesso'});
    }catch(e){
        res.status(400).send({
            message: 'Falha ao cadastrar ciente', 
            data:e
        });

    }
};

exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            email: customer.email,
            name: customer.name
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};