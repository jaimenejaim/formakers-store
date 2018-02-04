'use strict';

var repository = require('../repositories/categories');

exports.findAll = function (req, res, next) {
    repository.findAll().then(function (result) {
        if (result.length === 0) {
            res.status(404).json({ message: "Categories not found" });
            return;
        }
        res.status(200).json(result);
    }).catch(function (err) {
        return res.status(500).json(err);
    });
};

exports.find = function (req, res, next) {

    var category = {
        id: req.params.id
    };

    repository.find(category.id).then(function (result) {
        if (!result) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json(result);
    }).catch(function (err) {
        return res.status(500).json(err);
    });
};

exports.create = function (req, res, next) {

    var category = {
        description: req.body.description
    };

    repository.create(category).then(function (result) {
        return res.status(200).json({ message: "Created Successfully" });
    }).catch(function (err) {
        return res.status(500).json(err);
    });
};

exports.update = function (req, res, next) {
    var category = {
        id: req.params.id,
        description: req.body.description
    };

    repository.update(category).then(function (result) {
        return res.status(200).json({ message: "Updated Successfully" });
    }).catch(function (err) {
        return res.status(500).json(err);
    });
};

exports.delete = function (req, res, next) {
    var category = {
        id: req.params.id
    };

    repository.delete(category).then(function (result) {
        return res.status(200).json({ message: "Deleted Successfully" });
    }).catch(function (err) {
        return res.status(500).json(err);
    });
};
//# sourceMappingURL=categories.js.map