'use strict';

var repository_manufacturer = require('../repositories/manufacturers');
var repository_category = require('../repositories/categories');

exports.create = function (req, res, next) {

    /*
     * Executa as funções sequencialmente.
     * */
    Promise.all([vefityManufacturer(), varifyCategory()]).then(function () {
        return next();
    }).catch(function (err) {
        return res.status(500).json({ message: err.message });
    });

    /*
     * Verifica se o fabricante existe na base de dados.
     * */
    function vefityManufacturer() {
        return new Promise(function (resolve, reject) {
            repository_manufacturer.find(req.body.manufacturerId).then(function (result) {
                if (result === null) {
                    reject(new Error("Manufacturer Not Found"));
                } else {
                    resolve();
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    }

    /*
     * Verifica se a categoria existe no banco de dados.
     * */
    function varifyCategory() {
        return new Promise(function (resolve, reject) {
            repository_category.find(req.body.categoryId).then(function (result) {
                if (result === null) {
                    reject(new Error("Category Not Found"));
                } else {
                    resolve();
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    }
};

exports.update = function (req, res, next) {
    next();
};

exports.delete = function (req, res, next) {
    next();
};
//# sourceMappingURL=products.js.map