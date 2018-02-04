'use strict';

const models = require('../models/index');
const Users = models.users;

const attributes_login = ['id', 'email','type','password'];
const attributes = ['id','first_name','last_name','type','email','is_active'];
const attributes_admin = ['id','first_name','last_name','type','email','is_active','createdAt','updatedAt','last_login'];


exports.logIn = (email,password) => {
    return new Promise((resolve,reject) => {
        Users.findOne({ where : { email : email, password : password , is_active: 1 }, attributes : attributes_login })
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
};

exports.findAll = () => {
    return new Promise((resolve,reject) => {
        Users.findAll({ where : { is_active: 1 }, attributes : attributes_admin })
            .then(result => resolve(result)).catch(err => reject(err));
    });
};

exports.find = (id) => {
    return new Promise((resolve,reject) => {
        Users.find({ where : { id : id, is_active: 1  }, attributes : attributes_admin })
            .then(result => resolve(result)).catch(err => reject(err));
    });
};

exports.create = (data) => {
    return new Promise((resolve,reject) => {
        let user = new Users(data);
        user.save().then(result => resolve(result)).catch(err => reject(err));
    });
};

exports.update = (user) => {
    return new Promise( (resolve, reject) => {
        Users.find({ where: { id: user.id } }).then(result => {
            return result.updateAttributes({
                first_name : user.first_name,
                last_name : user.last_name,
                type : user.type
            })
        }).then(updatedObject => resolve(updatedObject)).catch(err => reject(err));
    });
};

exports.updateLastLogIn = (user) => {
    return new Promise( (resolve, reject) => {
        Users.find({ where: { id: user.id } }).then(result => {
            let now = Date.now();
            return result.updateAttributes({
                last_login : now
            })
        }).then(updatedObject => resolve(updatedObject)).catch(err => reject(err));
    });
};

exports.delete = (id) => {
    return new Promise( (resolve, reject) => {
        Users.find({ where: { id: id } }).then(result => {
            return result.updateAttributes({ is_active : 0 })
        }).then(updatedObject => resolve(updatedObject)).catch(err => reject(err));
    });
};




