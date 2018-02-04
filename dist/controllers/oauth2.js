'use strict';

var repository = require('../repositories/oauth2');

exports.find = function (bearerToken) {
    return new Promise(function (resolve, reject) {
        repository.find({ where: { accessToken: bearerToken } }).then(function (accessToken) {
            return resolve(accessToken);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.getClient = function (clientId, clientSecret) {};
//# sourceMappingURL=oauth2.js.map