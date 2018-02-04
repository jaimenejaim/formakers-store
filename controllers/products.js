'use strict';

const repository = require('../repositories/products');
const repository_category = require('../repositories/categories');
const repository_manufacturer = require('../repositories/manufacturers');

exports.findAll = (req, res, next) => {
    repository.findAll()
        .then(result => {
            if(result.length === 0){
                res.status(404).json({ "message" : "Products not found" });
                return;
            }
            res.status(200).json(result);
        }).catch(err => res.status(500).json(err));
};

exports.find = (req,res,next) => {

    let products = {
        id : req.params.id
    };

    repository.find(products)
        .then(result => {
            if(!result){
                res.status(404).json({ "message" : "Product not found" });
                return;
            }
            res.status(200).json(result);
        }).catch(err => res.status(500).json(err));
};

exports.create = (req, res, next) => {

    let products = {
        title : req.body.title,
        description: req.body.description,
        link: req.body.link,
        quantity: req.body.quantity,
        price: req.body.price,
        categoryId: req.body.categoryId,
        manufacturerId: req.body.manufacturerId,
        photos : [
            {
                photo_id : 'ASik1230ajaA',
                url : 'http://res.cloudinary.com/drfcfazt5/image/upload/v1513449856/cicaqlqbmpaiizruevrj.jpg',
                cover : true
            }, {
                photo_id : 'ASikjsoi1j23',
                url : 'http://res.cloudinary.com/drfcfazt5/image/upload/v1513449856/wuwxsajqqp9ovqeobu0w.jpg',
             cover : false
            }, {
                photo_id : 'e0eX12osoi1j23',
                url : 'http://res.cloudinary.com/drfcfazt5/image/upload/v1513449855/va7ugcrig8zzajrvpbty.jpg',
                cover : false
            }
        ]
    };

    repository.create(products).then(() => {
        res.status(200).json({ message : "Created Successfully"});
    }).catch(err => {
        res.status(500).json({ message : err.message });
    });

};


exports.update = (req,res,next) => {
    let products = {
        id : req.params.id,
        description : req.body.description
    };

    repository.update(products)
        .then(result => res.status(200).json({ message : "Updated Successfully"}))
        .catch(err => res.status(500).json(err));
};


exports.delete = (req,res,next) => {
    let products = {
        id : req.params.id
    };

    repository.delete(products.id)
        .then(result => res.status(200).json({ message : "Deleted Successfully"}))
        .catch(err =>{
            if(err === 0)
                res.status(404).json({ message : "Not Found" });
            else
                res.status(500).json(err);
        });
};

exports.findAllByManufacturer = (req, res, next) => {

    let product = {
        id : req.params.id
    };

    repository.findAllByManufacturer(product)
        .then(result => {
            if(result.length === 0){
                res.status(404).json({ "message" : "Products not found" });
                return;
            }
            res.status(200).json(result);
        }).catch(err => res.status(500).json(err));
};

exports.findAllByCategory = (req, res, next) => {

    let product = {
        id : req.params.id
    };

    repository.findAllByCategory(product)
        .then(result => {
            if(result.length === 0){
                res.status(404).json({ "message" : "Products not found" });
                return;
            }
            res.status(200).json(result);
        }).catch(err => res.status(500).json(err));
};
