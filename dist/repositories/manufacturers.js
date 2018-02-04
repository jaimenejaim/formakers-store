'use strict';

var models = require('../models/index');
var Manufacturer = models.manufacturers;

exports.findAll = function () {
    return new Promise(function (resolve, reject) {
        Manufacturer.findAll({ where: { is_active: 1 }, attributes: ['id', 'description', 'createdAt'] }).then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.find = function (id) {
    return new Promise(function (resolve, reject) {
        Manufacturer.find({ where: { id: id, is_active: 1 } }).then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.create = function (data) {
    return new Promise(function (resolve, reject) {
        var manufacturer = new Manufacturer(data);
        manufacturer.save().then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.update = function (manufacturer) {
    return new Promise(function (resolve, reject) {
        Manufacturer.find({ where: { id: manufacturer.id } }).then(function (result) {
            return result.updateAttributes({ description: manufacturer.description });
        }).then(function (updatedObject) {
            return resolve(updatedObject);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.delete = function (id) {
    return new Promise(function (resolve, reject) {
        Manufacturer.find({ where: { id: id } }).then(function (result) {
            return result.updateAttributes({ is_active: 0 });
        }).then(function (updatedObject) {
            return resolve(updatedObject);
        }).catch(function (err) {
            return reject(err);
        });
    });
};
//# sourceMappingURL=manufacturers.js.map