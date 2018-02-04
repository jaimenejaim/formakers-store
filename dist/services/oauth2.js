'use strict';

// const controller = require('../controllers/oauth2');

var _require = require('../models/index'),
    auth_access_tokens = _require.auth_access_tokens,
    auth_clients = _require.auth_clients,
    users = _require.users,
    auth_refresh_tokens = _require.auth_refresh_tokens;

exports.getAccessToken = function (bearerToken, callback) {
    console.log('getAccessToken');
    auth_access_tokens.find({ where: { accessToken: bearerToken } }).then(function (accessToken) {
        callback(null, accessToken);
    }).catch(function (err) {
        console.log('err', err);
    });
};

exports.getClient = function (clientId, clientSecret, callback) {
    console.log('getClient');
    var where = {
        clientId: clientId,
        clientSecret: clientSecret
    };
    auth_clients.find({ where: where }).then(function (client) {
        callback(null, client);
    }).catch(function (err) {
        console.log('err', err);
    });
};

exports.getUserFromClient = function (clientId, clientSecret, callback) {
    console.log('getUserFromClient');
    var where = {
        clientId: clientId,
        clientSecret: clientSecret
    };
    auth_clients.find({ where: where }).then(function (client) {
        if (!client) {
            callback('invalid clientId or clientSecret');
            return;
        }
        users.find(client.userId).then(function (user) {
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
    users.find({ where: where }).then(function (user) {
        callback(null, user);
    });
};

exports.saveAccessToken = function (accessToken, clientId, expires, user, callback) {
    console.log('saveAccessToken');
    auth_access_tokens.findOrCreate({
        userId: user.id
    }).then(function (token, created) {
        if (created) {
            token.updateAttributes({
                accessToken: accessToken,
                clientId: clientId,
                expires: expires
            }).then(function () {
                callback(false);
            });
            return;
        }
        callback(false);
    });
};

exports.saveRefreshToken = function (refreshToken, clientId, expires, user, callback) {
    console.log('saveRefreshToken');
    auth_refresh_tokens.findOrCreate({
        userId: user.id
    }).then(function (token, created) {
        if (created) {
            token.updateAttributes({
                refreshToken: refreshToken,
                clientId: clientId,
                expires: expires
            }).then(function () {
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
//# sourceMappingURL=oauth2.js.map