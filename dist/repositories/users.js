'use strict';

var models = require('../models/index');
var Users = models.users;

var attributes_login = ['id', 'email', 'type', 'password'];
var attributes = ['id', 'first_name', 'last_name', 'type', 'email', 'is_active'];
var attributes_admin = ['id', 'first_name', 'last_name', 'type', 'email', 'is_active', 'createdAt', 'updatedAt', 'last_login'];

exports.logIn = function (email, password) {
    return new Promise(function (resolve, reject) {
        Users.findOne({ where: { email: email, password: password, is_active: 1 }, attributes: attributes_login }).then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.findAll = function () {
    return new Promise(function (resolve, reject) {
        Users.findAll({ where: { is_active: 1 }, attributes: attributes_admin }).then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.find = function (id) {
    return new Promise(function (resolve, reject) {
        Users.find({ where: { id: id, is_active: 1 }, attributes: attributes_admin }).then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.create = function (data) {
    return new Promise(function (resolve, reject) {
        var user = new Users(data);
        user.save().then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.update = function (user) {
    return new Promise(function (resolve, reject) {
        Users.find({ where: { id: user.id } }).then(function (result) {
            return result.updateAttributes({
                first_name: user.first_name,
                last_name: user.last_name,
                type: user.type
            });
        }).then(function (updatedObject) {
            return resolve(updatedObject);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.updateLastLogIn = function (user) {
    return new Promise(function (resolve, reject) {
        Users.find({ where: { id: user.id } }).then(function (result) {
            var now = Date.now();
            return result.updateAttributes({
                last_login: now
            });
        }).then(function (updatedObject) {
            return resolve(updatedObject);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.delete = function (id) {
    return new Promise(function (resolve, reject) {
        Users.find({ where: { id: id } }).then(function (result) {
            return result.updateAttributes({ is_active: 0 });
        }).then(function (updatedObject) {
            return resolve(updatedObject);
        }).catch(function (err) {
            return reject(err);
        });
    });
};
//# sourceMappingURL=users.js.map