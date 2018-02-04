'use strict';

const models = require('../models/index');
const Categories = models.categories;

exports.findAll = () => {
    return new Promise((resolve,reject) => {
        Categories.findAll({ where : { is_active: 1 }, attributes : ['id', 'description', 'createdAt'] }).then(result => resolve(result)).catch(err => reject(err));
    });
};

exports.find = (id) => {
    return new Promise((resolve,reject) => {
        Categories.find({ where : { id : id, is_active: 1  } }).then(result => resolve(result)).catch(err => reject(err));
    });
};

exports.create = (data) => {
    return new Promise((resolve,reject) => {
        let categorie = new Categories(data);
        categorie.save().then(result => resolve(result)).catch(err => reject(err));
    });
};


exports.update = (category) => {
    return new Promise( (resolve, reject) => {
        Categories.find({ where: { id: category.id } }).then(result => {
            return result.updateAttributes({ description : category.description })
        }).then(updatedObject => resolve(updatedObject)).catch(err => reject(err));

    });
};

exports.delete = (id) => {
    return new Promise( (resolve, reject) => {
        Categories.find({ where: { id: id } }).then(result => {
            return result.updateAttributes({ is_active : 0 })
        }).then(updatedObject => resolve(updatedObject)).catch(err => reject(err));
    });
};