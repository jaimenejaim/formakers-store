'use strict';

var sequelize = require('../models/index').sequelize;
var models = require('../models/index');
var Products = models.products;
var Category = models.categories;
var ProductsPhotos = models.productsphotos;

var attributes = ['id', 'title', 'quantity', 'price', 'is_active', 'createdAt'];
var attributes_details = ['id', 'title', 'description', 'quantity', 'price', 'is_active', 'createdAt'];

exports.findAll = function () {
    return new Promise(function (resolve, reject) {
        Products.findAll({ where: { is_active: 1 }, attributes: attributes,
            include: [{ model: models.productsphotos, attributes: ['url', 'cover', 'createdAt'], where: { cover: true } }]
        }).then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.find = function (product) {
    return new Promise(function (resolve, reject) {
        Products.find({ where: { id: product.id, is_active: 1 }, attributes: attributes_details,
            include: [{ model: models.productsphotos, attributes: ['url', 'cover', 'createdAt'] }, { model: models.categories, attributes: ['id', 'description'] }, { model: models.manufacturers, attributes: ['id', 'description'] }]
        }).then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.create = function (data) {
    return new Promise(function (resolve, reject) {

        sequelize.transaction().then(function (t) {
            Products.create(data, { transaction: t }).then(function (result) {
                data.photos.forEach(function (photo, index) {
                    console.log(result.id);
                    photo.productId = result.id;
                    ProductsPhotos.create(photo, { transaction: t }).then(function () {
                        if (index === data.photos.length - 1) {
                            t.commit();
                            resolve();
                        }
                    }).catch(function (err) {
                        t.rollback();
                        reject(err);
                    });
                });
            }).catch(function (err) {
                t.rollback();
                reject(err);
            });
        });
    });
};

exports.update = function (product) {
    return new Promise(function (resolve, reject) {
        Products.find({ where: { id: product.id } }).then(function (result) {
            return result.updateAttributes({ description: product.description });
        }).then(function (updatedObject) {
            return resolve(updatedObject);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.disable = function (id) {
    return new Promise(function (resolve, reject) {
        Products.find({ where: { id: id } }).then(function (result) {
            return result.updateAttributes({ is_active: 0 });
        }).then(function (updatedObject) {
            return resolve(updatedObject);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.delete = function (id) {
    return new Promise(function (resolve, reject) {
        Products.find({
            where: { id: id }, include: [{ model: models.productsphotos, attributes: ['id'] }]
        }).then(function (product) {

            if (product) {
                sequelize.transaction().then(function (t) {
                    if (product.productsphotos.length > 0) {
                        product.productsphotos.forEach(function (photo, index) {
                            photo.destroy({ transaction: t }).then(function () {
                                if (index === product.productsphotos.length - 1) {
                                    notify(t, product);
                                }
                            }).catch(function (err) {
                                t.rollback();
                                reject(err);
                            });
                        });
                    } else {
                        notify(t, product);
                    }

                    function notify(t, result) {
                        result.destroy({ transaction: t }).then(function (result) {
                            t.commit();
                            resolve(result);
                        }).catch(function (err) {
                            t.rollback();
                            reject(err);
                        });
                    }
                });
            } else {
                reject(0);
            }
        });
    });
};

exports.findAllByManufacturer = function (product) {
    return new Promise(function (resolve, reject) {
        Products.findAll({ where: { is_active: 1, manufacturerId: product.id }, attributes: attributes_details }).then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.findAllByCategory = function (product) {
    return new Promise(function (resolve, reject) {
        Products.findAll({ where: { is_active: 1, categoryId: product.id }, attributes: attributes_details }).then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};
//# sourceMappingURL=products.js.map