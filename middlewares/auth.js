
const { fabric, decode, valid } = require('../resources/Token');

module.exports.permissions = (roles = []) => {
    return (req, res, next) => {

        let hasSend = false;

        roles.forEach((role, index) => {
            decode(this.getFromRequest(req)).then(token => {

                if (token.type === role) {
                    console.log('aaaaa');
                    console.log('role = ', role);
                    console.log('token.type = ', token.type);
                    hasSend = true;
                    next();
                }else{
                    if(index === roles.length -1 && !hasSend){
                        lastResponse();
                    }
                }
            }).catch(err => {
                console.log(err);
                return res.status(500).json({ errorMessage : err.message });
            });
        });
        
        function lastResponse() {
            res.status(403).json({ message : "You do not have sufficient privileges to access this information" });
        }

    }
};


module.exports.authorization = (req,res,next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        // verifies secret and checks exp

        valid(token).then(() => {
            next();
        }).catch(err => {
            res.status(500).json({ message : err.message });
        });
    } else {
        // forbidden without token
        res.status(401).json({ message : "Unauthorized to verify this content" });
    }
};


module.exports.getFromRequest = (req) => {
  return req.body.token || req.query.token || req.headers['x-access-token'];
};
