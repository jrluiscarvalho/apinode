'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product
    .find({
        active:true
    }, 'title price slug')
}

exports.getBySlug = (slug) => {
    return Product
    .findOne({
        slug: req.params.slug,
        active:true
    }, 'title price slug')
}

exports.getByTag = (tag) => {
    return Product
    .find({
        tags: tag,
        active:true
    }, 'title price slug tags')
}

exports.getById = (id) => {
    return Product
    .findById(id)
}

exports.post = () => {
    Product
        .save()
};


exports.put = () => {
    Product
        .findByIdAndUpdate(req.params.id,{
            $set:{
                tags:req.body.tags,
            }
        });
};
  
exports.delete = () => {
    Product
        .findByIdAndRemove(req.body.id)
};