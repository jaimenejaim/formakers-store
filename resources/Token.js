'use strict';

let jwt = require('jsonwebtoken');
let moment = require('moment');
let env = process.env.NODE_ENV || "development";
const secure    = require(__dirname + '/../config/secure.json')[env];
let secret_token = secure.api.secret_token;
const expires = moment().add(12,'days').valueOf();

/*
* Gera um novo token
* */
exports.fabric = (value) => {
    return new Promise((resolve,reject) => {
        try {
            let payload = {
                token: jwt.sign(value, secret_token, {expiresIn: expires}),
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
exports.decode = token => {
    return new Promise((resolve,reject) => {
        try {
            let decoded = jwt.decode(token, secret_token);
            resolve(decoded);
        }catch (err){
            reject(err);
        }
    });
};


/*
* Verifica se o token é válido
* */
exports.valid  = token => {
    return new Promise((resolve,reject) => {
        jwt.verify(token, secret_token, (err, decoded) => {

            if (err) reject(new Error("Failed verification your credentials"));

            resolve(decoded);
        });
    });
};

