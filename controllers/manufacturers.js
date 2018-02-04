'use strict';

const repository = require('../repositories/manufacturers');

exports.findAll = (req, res, next) => {
    repository.findAll()
    .then(result => {
        if(result.length === 0){
            res.status(404).json({ message : "Manufacturers not found" });
            return;
        }
        res.status(200).json(result);
    }).catch(err => res.status(500).json(err));
};

exports.find = (req,res,next) => {

    let manufacturer = {
        id : req.params.id
    };

    repository.find(manufacturer.id)
        .then(result => {
            if(!result){
                res.status(404).json({ message : "Manufacturer not found" });
                return;
            }
            res.status(200).json(result);
        }).catch(err => res.status(500).json(err));
};

exports.create = (req, res, next) => {

    let manufacturer = {
        description : req.body.description
    };

    repository.create(manufacturer)
        .then(result => res.status(200).json({ message : "Created Successfully"}))
        .catch(err => res.status(500).json(err));
};


exports.update = (req,res,next) => {
    let manufacturer = {
        id : req.params.id,
        description : req.body.description
    };

    repository.update(manufacturer)
        .then(result => res.status(200).json({ message : "Updated Successfully"}))
        .catch(err => res.status(500).json(err));
};


exports.delete = (req,res,next) => {
    let manufacturer = {
        id : req.params.id
    };

    repository.delete(manufacturer)
        .then(result => res.status(200).json({ message : "Deleted Successfully"}))
        .catch(err => res.status(500).json(err));
};
