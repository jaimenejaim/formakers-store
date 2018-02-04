
exports.find = (req, res, next) => {
    next();
};

exports.create = (req, res, next) => {

    if(req.body.first_name === undefined) return res.status(422).json({ errorMessage : 'first_name parameter is required' });
    if(req.body.last_name === undefined) return res.status(422).json({ errorMessage : 'last_name parameter is required' });
    if(req.body.type === undefined) return res.status(422).json({ errorMessage : 'type parameter is required' });
    if(req.body.email === undefined) return res.status(422).json({ errorMessage : 'e-mail parameter is required' });
    if(req.body.password === undefined) return res.status(422).json({ errorMessage : 'password parameter is required' });


    next();
};

exports.update = (req, res, next) => {

    if(req.params.id === undefined) return res.status(422).json({ errorMessage : 'id parameter is required' });
    if(req.body.first_name === undefined) return res.status(422).json({ errorMessage : 'first_name parameter is required' });
    if(req.body.last_name === undefined) return res.status(422).json({ errorMessage : 'last_name parameter is required' });
    if(req.body.type === undefined) return res.status(422).json({ errorMessage : 'type parameter is required' });

    next();
};


exports.delete = (req, res, next) => {
    if(req.params.id === undefined) return res.status(422).json({ errorMessage : 'id parameter is required' });
    next();
};