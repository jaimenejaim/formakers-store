const repository_manufacturer = require('../repositories/manufacturers');
const repository_category = require('../repositories/categories');

exports.create = (req, res, next) => {

    /*
     * Executa as funções sequencialmente.
     * */
    Promise.all([vefityManufacturer(), varifyCategory()])
        .then(() => next())
        .catch(err => res.status(500).json({ message : err.message}));


    /*
     * Verifica se o fabricante existe na base de dados.
     * */
    function vefityManufacturer() {
        return new Promise((resolve,reject) => {
            repository_manufacturer.find(req.body.manufacturerId).then(result => {
                if(result === null){
                    reject(new Error("Manufacturer Not Found"));
                }else{
                    resolve();
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

    /*
     * Verifica se a categoria existe no banco de dados.
     * */
    function varifyCategory() {
        return new Promise((resolve,reject) => {
            repository_category.find(req.body.categoryId).then(result => {
                if(result === null){
                    reject(new Error("Category Not Found"));
                }else{
                    resolve();
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
};


exports.update = (req, res, next) => {
    next();
};

exports.delete = (req, res, next) => {
    next();
};





