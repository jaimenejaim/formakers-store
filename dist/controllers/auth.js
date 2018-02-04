'use strict';

var repository = require('../repositories/users');
var Token = require('../resources/Token');

exports.authenticate = function (req, res, next) {

    var user = {
        email: req.body.email,
        password: req.body.password
    };

    repository.logIn(user.email, user.password).then(function (result) {
        if (!result) {
            res.status(401).json({ "message": "email or password is wrong" });
            return;
        }

        var payload = {
            id: result.id,
            email: result.email,
            type: result.type
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
        return res.status(500).json(err);
    });
};

exports.refresh = function (req, res, next) {
    // repository.findAll()
    //     .then(result => {
    //         if(result.length === 0){
    //             res.status(404).json({ "message" : "Products not found" });
    //             return;
    //         }
    //         res.status(200).json(result);
    //     }).catch(err => res.status(500).json(err));

    next();
};

exports.requestPassword = function (req, res, next) {

    //retorno o token e o tempo restante para ele poder trocar a senha.

    next();
};

exports.changePassword = function (req, res, next) {

    next();
};
//# sourceMappingURL=auth.js.map