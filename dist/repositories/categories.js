'use strict';

var models = require('../models/index');
var Categories = models.categories;

exports.findAll = function () {
    return new Promise(function (resolve, reject) {
        Categories.findAll({ where: { is_active: 1 }, attributes: ['id', 'description', 'createdAt'] }).then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.find = function (id) {
    return new Promise(function (resolve, reject) {
        Categories.find({ where: { id: id, is_active: 1 } }).then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.create = function (data) {
    return new Promise(function (resolve, reject) {
        var categorie = new Categories(data);
        categorie.save().then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.update = function (category) {
    return new Promise(function (resolve, reject) {
        Categories.find({ where: { id: category.id } }).then(function (result) {
            return result.updateAttributes({ description: category.description });
        }).then(function (updatedObject) {
            return resolve(updatedObject);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.delete = function (id) {
    return new Promise(function (resolve, reject) {
        Categories.find({ where: { id: id } }).then(function (result) {
            return result.updateAttributes({ is_active: 0 });
        }).then(function (updatedObject) {
            return resolve(updatedObject);
        }).catch(function (err) {
            return reject(err);
        });
    });
};
//# sourceMappingURL=categories.js.map