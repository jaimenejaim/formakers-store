'use strict';

const repository = require('../repositories/users');
const Token = require('../resources/Token');

exports.findAll = (req, res, next) => {
    repository.findAll()
        .then(result => {

            if(result.length === 0) return res.status(404).json({ message : "Users not found" });

            res.status(200).json(result);
        }).catch(err => res.status(500).json(err));
};

exports.find = (req,res,next) => {

    let category = {
        id : req.params.id
    };

    repository.find(category.id)
        .then(result => {
            if(!result) return res.status(404).json({ message : "User not found" });
            res.status(200).json(result);
        }).catch(err => res.status(500).json(err));
};

exports.create = (req, res, next) => {

    let user = {
        id : req.params.id,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        type : req.body.type,
        email : req.body.email,
        password : req.body.password
    };

    repository.create(user)
        .then(result => {
          repository.find(result.id)
              .then(user => {

                  let payload = {
                      id : user.id,
                      email : user.email,
                      type : user.type
                  };

                    Token.fabric(payload).then(token => {

                        repository.updateLastLogIn(payload)
                            .then(() => res.status(200).json(token))
                            .catch(err => res.status(500).json({ errorMessage : err.message }));

                    }).catch(err => {
                        res.status(500).json({ errorMessage : err.message });
                    });
              })
              .catch(err => res.status(500).json({ errorMessage : err.message }));
        })
        .catch(err => res.status(500).json(err));
};


exports.update = (req,res,next) => {
    let user = {
        id : req.params.id,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        type : req.body.type
    };

        repository.update(user)
        .then(() => res.status(200).json({ message : "Updated Successfully"}))
        .catch(err => res.status(500).json(err));
};


exports.delete = (req,res,next) => {
    let category = {
        id : req.params.id
    };

    repository.delete(category)
        .then(() => res.status(200).json({ message : "Deleted Successfully"}))
        .catch(err => res.status(500).json(err));
};