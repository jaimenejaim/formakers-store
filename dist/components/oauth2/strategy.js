'use strict';

var db = require('../../models/index');

exports.getAccessToken = function (bearerToken, callback) {
    console.log('getAccessToken');
    db.auth_access_tokens.find({ where: { accessToken: bearerToken } }).success(function (accessToken) {
        callback(null, accessToken);
    }).error(function (err) {
        console.log('err', err);
    });
};

exports.getClient = function (clientId, clientSecret, callback) {
    console.log('getClient');
    var where = {
        clientId: clientId,
        clientSecret: clientSecret
    };
    db.auth_clients.find({ where: where }).success(function (client) {
        callback(null, client);
    });
};

exports.getUserFromClient = function (clientId, clientSecret, callback) {
    console.log('getUserFromClient');
    var where = {
        clientId: clientId,
        clientSecret: clientSecret
    };
    db.auth_clients.find({ where: where }).success(function (client) {
        if (!client) {
            callback('invalid clientId or clientSecret');
            return;
        }
        db.users.find(client.userId).success(function (user) {
            callback(false, user);
        });
    });
};

exports.grantTypeAllowed = function (clientId, grantType, callback) {
    console.log('grantTypeAllowed');
    callback(false, true);
};

exports.getUser = function (username, password, callback) {
    console.log('getUser');
    var where = {
        username: username,
        password: password
    };
    db.users.find({ where: where }).success(function (user) {
        callback(null, user);
    });
};

exports.saveAccessToken = function (accessToken, clientId, expires, user, callback) {
    console.log('saveAccessToken');
    db.auth_access_tokens.findOrCreate({
        userId: user.id
    }).success(function (token, created) {
        if (created) {
            token.updateAttributes({
                accessToken: accessToken,
                clientId: clientId,
                expires: expires
            }).success(function () {
                callback(false);
            });
            return;
        }
        callback(false);
    });
}, exports.saveRefreshToken = function (refreshToken, clientId, expires, user, callback) {
    console.log('saveRefreshToken');
    db.auth_refresh_tokens.findOrCreate({
        userId: user.id
    }).success(function (token, created) {
        if (created) {
            token.updateAttributes({
                refreshToken: refreshToken,
                clientId: clientId,
                expires: expires
            }).success(function () {
                callback(false);
            });
            return;
        }
        callback(false);
    });
};

exports.getRefreshToken = function (refreshToken, callback) {
    console.log('getRefreshToken');
};

exports.revokeRefreshToken = function (refreshToken, callback) {
    console.log('revokeRefreshToken');
};
//# sourceMappingURL=strategy.js.map