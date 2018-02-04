'use strict';

var _require = require('../models/index'),
    auth_access_tokens = _require.auth_access_tokens,
    auth_clients = _require.auth_clients;

exports.getAccessToken = function (bearerToken) {
    return new Promise(function (resolve, reject) {
        auth_access_tokens.find({ where: { accessToken: bearerToken } }).then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.getClient = function (clientId, clientSecret) {
    return new Promise(function (resolve, reject) {
        auth_clients.find({ where: { clientId: clientId, clientSecret: clientSecret } }).then(function (result) {
            return resolve(result);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

exports.getUserFromClient = function (clientId, clientSecret) {
    return new Promise(function (resolve, reject) {});
};

exports.getUser = function (username, password) {
    return new Promise(function (resolve, reject) {});
};

exports.saveAccessToken = function (accessToken, clientId, expires, user) {
    return new Promise(function (resolve, reject) {});
};

exports.saveRefreshToken = function (refreshToken, clientId, expires, user) {
    return new Promise(function (resolve, reject) {});
};
//# sourceMappingURL=oauth2.js.map