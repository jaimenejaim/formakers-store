'use strict';

var repository = require('../repositories/products');
var repository_category = require('../repositories/categories');
var repository_manufacturer = require('../repositories/manufacturers');

exports.findAll = function (req, res, next) {
    repository.findAll().then(function (result) {
        if (result.length === 0) {
            res.status(404).json({ "message": "Products not found" });
            return;
        }
        res.status(200).json(result);
    }).catch(function (err) {
        return res.status(500).json(err);
    });
};

exports.find = function (req, res, next) {

    var products = {
        id: req.params.id
    };

    repository.find(products).then(function (result) {
        if (!result) {
            res.status(404).json({ "message": "Product not found" });
            return;
        }
        res.status(200).json(result);
    }).catch(function (err) {
        return res.status(500).json(err);
    });
};

exports.create = function (req, res, next) {

    var products = {
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        quantity: req.body.quantity,
        price: req.body.price,
        categoryId: req.body.categoryId,
        manufacturerId: req.body.manufacturerId,
        photos: [{
            photo_id: 'ASik1230ajaA',
            url: 'http://res.cloudinary.com/drfcfazt5/image/upload/v1513449856/cicaqlqbmpaiizruevrj.jpg',
            cover: true
        }, {
            photo_id: 'ASikjsoi1j23',
            url: 'http://res.cloudinary.com/drfcfazt5/image/upload/v1513449856/wuwxsajqqp9ovqeobu0w.jpg',
            cover: false
        }, {
            photo_id: 'e0eX12osoi1j23',
            url: 'http://res.cloudinary.com/drfcfazt5/image/upload/v1513449855/va7ugcrig8zzajrvpbty.jpg',
            cover: false
        }]
    };

    repository.create(products).then(function () {
        res.status(200).json({ message: "Created Successfully" });
    }).catch(function (err) {
        res.status(500).json({ message: err.message });
    });
};

exports.update = function (req, res, next) {
    var products = {
        id: req.params.id,
        description: req.body.description
    };

    repository.update(products).then(function (result) {
        return res.status(200).json({ message: "Updated Successfully" });
    }).catch(function (err) {
        return res.status(500).json(err);
    });
};

exports.delete = function (req, res, next) {
    var products = {
        id: req.params.id
    };

    repository.delete(products.id).then(function (result) {
        return res.status(200).json({ message: "Deleted Successfully" });
    }).catch(function (err) {
        if (err === 0) res.status(404).json({ message: "Not Found" });else res.status(500).json(err);
    });
};

exports.findAllByManufacturer = function (req, res, next) {

    var product = {
        id: req.params.id
    };

    repository.findAllByManufacturer(product).then(function (result) {
        if (result.length === 0) {
            res.status(404).json({ "message": "Products not found" });
            return;
        }
        res.status(200).json(result);
    }).catch(function (err) {
        return res.status(500).json(err);
    });
};

exports.findAllByCategory = function (req, res, next) {

    var product = {
        id: req.params.id
    };

    repository.findAllByCategory(product).then(function (result) {
        if (result.length === 0) {
            res.status(404).json({ "message": "Products not found" });
            return;
        }
        res.status(200).json(result);
    }).catch(function (err) {
        return res.status(500).json(err);
    });
};
//# sourceMappingURL=products.js.map