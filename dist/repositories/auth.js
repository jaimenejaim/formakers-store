'use strict';

var Users = require('../models/index').users;

exports.login = function (data) {
    return new Promise(function (resolve, reject) {
        Users.find({ where: { username: data.username, password: data.password } }).then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.refresh = function (data) {
    return new Promise(function (resolve, reject) {
        Users.find({ where: { username: data.username, password: data.password } }).then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};
//# sourceMappingURL=oauth2.js.map