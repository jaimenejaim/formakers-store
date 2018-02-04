'use strict';

const models = require('../models/index');
const Manufacturer = models.manufacturers;

exports.findAll = () => {
    return new Promise((resolve,reject) => {
        Manufacturer.findAll({ where : { is_active: 1 }, attributes : ['id', 'description', 'createdAt'] })
            .then(result => resolve(result)).catch(err => reject(err));
    });
};

exports.find = (id) => {
    return new Promise((resolve,reject) => {
        Manufacturer.find({ where : { id : id, is_active: 1  } })
            .then(result => resolve(result)).catch(err => reject(err));
    });
};

exports.create = (data) => {
    return new Promise((resolve,reject) => {
        let manufacturer = new Manufacturer(data);
        manufacturer.save().then(result => resolve(result)).catch(err => reject(err));
    });
};


exports.update = (manufacturer) => {
    return new Promise( (resolve, reject) => {
        Manufacturer.find({ where: { id: manufacturer.id } }).then(result => {
            return result.updateAttributes({ description : manufacturer.description })
        }).then(updatedObject => resolve(updatedObject)).catch(err => reject(err));

    });
};

exports.delete = (id) => {
    return new Promise( (resolve, reject) => {
        Manufacturer.find({ where: { id: id } }).then(result => {
            return result.updateAttributes({ is_active : 0 })
        }).then(updatedObject => resolve(updatedObject)).catch(err => reject(err));
    });
};

