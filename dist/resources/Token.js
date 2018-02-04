'use strict';

var jwt = require('jsonwebtoken');
var moment = require('moment');
var env = process.env.NODE_ENV || "development";
var secure = require(__dirname + '/../config/secure.json')[env];
var secret_token = secure.api.secret_token;
var expires = moment().add(12, 'days').valueOf();

/*
* Gera um novo token
* */
exports.fabric = function (value) {
    return new Promise(function (resolve, reject) {
        try {
            var payload = {
                token: jwt.sign(value, secret_token, { expiresIn: expires }),
                expire_in: expires
            };
            resolve(payload);
        } catch (err) {
            reject(err);
        }
    });
};

/*
* Decodifica o token
* */
exports.decode = function (token) {
    return new Promise(function (resolve, reject) {
        try {
            var decoded = jwt.decode(token, secret_token);
            resolve(decoded);
        } catch (err) {
            reject(err);
        }
    });
};

/*
* Verifica se o token é válido
* */
exports.valid = function (token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, secret_token, function (err, decoded) {

            if (err) reject(new Error("Failed verification your credentials"));

            resolve(decoded);
        });
    });
};
//# sourceMappingURL=Token.js.map