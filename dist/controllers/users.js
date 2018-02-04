'use strict';

var repository = require('../repositories/users');
var Token = require('../resources/Token');

exports.findAll = function (req, res, next) {
    repository.findAll().then(function (result) {

        if (result.length === 0) return res.status(404).json({ message: "Users not found" });

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
        if (!result) return res.status(404).json({ message: "User not found" });
        res.status(200).json(result);
    }).catch(function (err) {
        return res.status(500).json(err);
    });
};

exports.create = function (req, res, next) {

    var user = {
        id: req.params.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        type: req.body.type,
        email: req.body.email,
        password: req.body.password
    };

    repository.create(user).then(function (result) {
        repository.find(result.id).then(function (user) {

            var payload = {
                id: user.id,
                email: user.email,
                type: user.type
            };

            Token.fabric(payload).then(function (token) {

                repository.updateLastLogIn(payload).then(function () {
                    return res.status(200).json(token);
                }).catch(function (err) {
                    return res.status(500).json({ errorMessage: err.message });
                });
            }).catch(function (err) {
                res.status(500).json({ errorMessage: err.message });
            });
        }).catch(function (err) {
            return res.status(500).json({ errorMessage: err.message });
        });
    }).catch(function (err) {
        return res.status(500).json(err);
    });
};

exports.update = function (req, res, next) {
    var user = {
        id: req.params.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        type: req.body.type
    };

    repository.update(user).then(function () {
        return res.status(200).json({ message: "Updated Successfully" });
    }).catch(function (err) {
        return res.status(500).json(err);
    });
};

exports.delete = function (req, res, next) {
    var category = {
        id: req.params.id
    };

    repository.delete(category).then(function () {
        return res.status(200).json({ message: "Deleted Successfully" });
    }).catch(function (err) {
        return res.status(500).json(err);
    });
};
//# sourceMappingURL=users.js.map