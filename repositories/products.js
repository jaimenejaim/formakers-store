'use strict';

const sequelize = require('../models/index').sequelize;
const models = require('../models/index');
const Products = models.products;
const Category = models.categories;
const ProductsPhotos = models.productsphotos;

const attributes = ['id','title','quantity','price','is_active','createdAt'];
const attributes_details = ['id','title','description','quantity','price','is_active','createdAt'];

exports.findAll = () => {
    return new Promise((resolve,reject) => {
        Products.findAll({ where : { is_active: 1 }, attributes : attributes,
            include : [
                { model: models.productsphotos, attributes: ['url', 'cover','createdAt' ], where : { cover : true }  }
                ]
        }).then(result => resolve(result)).catch(err => reject(err));
    });
};

exports.find = (product) => {
    return new Promise((resolve,reject) => {
        Products.find({ where : { id : product.id, is_active: 1  }, attributes: attributes_details,
            include : [
                    { model: models.productsphotos, attributes: ['url', 'cover','createdAt' ]},
                    { model: models.categories, attributes: ['id','description'] },
                    { model: models.manufacturers, attributes : ['id','description'] }
                ]
        }).then(result => resolve(result)).catch(err => reject(err));
    });
};

exports.create = (data) => {
    return new Promise((resolve,reject) => {

        sequelize.transaction().then(t => {
            Products.create(data, { transaction : t }).then(result => {
                data.photos.forEach((photo,index) =>{
                    console.log(result.id);
                    photo.productId = result.id;
                    ProductsPhotos.create(photo, { transaction : t }).then(() => {
                        if(index === data.photos.length - 1){
                            t.commit();
                            resolve();
                        }
                    }).catch(err => {
                        t.rollback();
                        reject(err);
                    });
                });
            }).catch(err => {
                t.rollback();
                reject(err);
            });
        });
    });
};


exports.update = (product) => {
    return new Promise( (resolve, reject) => {
        Products.find({ where: { id: product.id } }).then(result => {
            return result.updateAttributes({ description : product.description })
        }).then(updatedObject => resolve(updatedObject)).catch(err => reject(err));

    });
};

exports.disable = (id) => {
    return new Promise( (resolve, reject) => {
        Products.find({ where: { id: id } }).then(result => {
            return result.updateAttributes({ is_active : 0 })
        }).then(updatedObject => resolve(updatedObject)).catch(err => reject(err));
    });
};

exports.delete = (id) => {
    return new Promise( (resolve, reject) => {
            Products.find({
                where: {id: id}, include: [
                    {model: models.productsphotos, attributes: ['id']}
                ]
            }).then(product => {

                if(product){
                    sequelize.transaction().then(t => {
                        if(product.productsphotos.length > 0){
                            product.productsphotos.forEach((photo, index) => {
                                photo.destroy({ transaction : t }).then(() => {
                                    if(index === product.productsphotos.length -1){
                                        notify(t,product);
                                    }
                                }).catch(err => {
                                    t.rollback();
                                    reject(err);
                                });
                            });
                        }else{
                            notify(t,product);
                        }

                        function notify(t,result) {
                            result.destroy({ transaction : t }).then(result => {
                                t.commit();
                                resolve(result);
                            }).catch(err => {
                                t.rollback();
                                reject(err);
                            });
                        }
                    });
                }else {
                    reject(0);
                }
            });

    });
};


exports.findAllByManufacturer = (product) => {
    return new Promise((resolve,reject) => {
        Products.findAll({ where : { is_active: 1, manufacturerId : product.id }, attributes : attributes_details })
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
};


exports.findAllByCategory = (product) => {
    return new Promise((resolve,reject) => {
        Products.findAll({ where : { is_active: 1, categoryId : product.id }, attributes : attributes_details })
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
};
