'use strict';

const repository = require('../repositories/users');
const Token = require('../resources/Token');

exports.authenticate = (req, res, next) => {


    let user = {
        email : req.body.email,
        password : req.body.password
    };

    repository.logIn(user.email, user.password)
        .then(result => {
            if(!result){
                res.status(401).json({ "message" : "email or password is wrong" });
                return;
            }

            let payload = {
                id : result.id,
                email : result.email,
                type : result.type
            };

            Token.fabric(payload).then(token => {

                repository.updateLastLogIn(payload)
                    .then(() => res.status(200).json(token))
                    .catch(err => res.status(500).json({ errorMessage : err.message }));


            }).catch(err => {
                res.status(500).json({ errorMessage : err.message });
            });

        })
        .catch(err => res.status(500).json(err));

};

exports.refresh = (req, res, next) => {
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


exports.requestPassword = (req, res, next) => {

    //retorno o token e o tempo restante para ele poder trocar a senha.

    next();
};

exports.changePassword = (req, res, next) => {
    
    next();
};