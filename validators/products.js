
exports.find = (req, res, next) => {
    next();
};

exports.create = (req, res, next) => {


    if(req.body.title === undefined) return res.status(422).json({ errorMessage : 'title parameter is required' });
    if(req.body.description === undefined) return res.status(422).json({ errorMessage : 'description parameter is required' });
    if(req.body.link === undefined) return res.status(422).json({ errorMessage : 'link parameter is required' });
    if(req.body.price === undefined) return res.status(422).json({ errorMessage : 'price parameter is required' });
    if(req.body.categoryId === undefined) return res.status(422).json({ errorMessage : 'categoryId parameter is required' });
    if(req.body.manufacturerId === undefined) return res.status(422).json({ errorMessage : 'manufacturerId parameter is required' });
    if(req.files === undefined) return res.status(422).json({ errorMessage : 'files parameter is required' });


    next();
};

exports.update = (req, res, next) => {
    if(req.params.id === undefined) return res.status(422).json({ errorMessage : 'id parameter is required' });
    if(req.body.title === undefined) return res.status(422).json({ errorMessage : 'title parameter is required' });
    if(req.body.description === undefined) return res.status(422).json({ errorMessage : 'description parameter is required' });
    if(req.body.link === undefined) return res.status(422).json({ errorMessage : 'link parameter is required' });
    if(req.body.price === undefined) return res.status(422).json({ errorMessage : 'price parameter is required' });
    if(req.body.categoryId === undefined) return res.status(422).json({ errorMessage : 'categoryId parameter is required' });
    if(req.body.manufacturerId === undefined) return res.status(422).json({ errorMessage : 'manufacturerId parameter is required' });

    next();
};

exports.delete = (req, res, next) => {
    if(req.params.id === undefined) return res.status(422).json({ errorMessage : 'id parameter is required' });
    next();
};

exports.findAllByManufacturer = (req,res,next) =>{
    if(req.params.id === undefined) return res.status(422).json({ errorMessage : 'id parameter is required' });
    next();
};

exports.findAllByCategory = (req, res, next) => {
    if(req.params.id === undefined) return res.status(422).json({ errorMessage : 'id parameter is required' });
    next();
};