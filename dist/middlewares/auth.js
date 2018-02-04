'use strict';

var _require = require('../resources/Token'),
    fabric = _require.fabric,
    decode = _require.decode,
    valid = _require.valid;

module.exports.permissions = function () {
    var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return function (req, res, next) {

        var hasSend = false;

        roles.forEach(function (role, index) {
            decode(undefined.getFromRequest(req)).then(function (token) {

                if (token.type === role) {
                    console.log('aaaaa');
                    console.log('role = ', role);
                    console.log('token.type = ', token.type);
                    hasSend = true;
                    next();
                } else {
                    if (index === roles.length - 1 && !hasSend) {
                        lastResponse();
                    }
                }
            }).catch(function (err) {
                console.log(err);
                return res.status(500).json({ errorMessage: err.message });
            });
        });

        function lastResponse() {
            res.status(403).json({ message: "You do not have sufficient privileges to access this information" });
        }
    };
};

module.exports.authorization = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        // verifies secret and checks exp

        valid(token).then(function () {
            next();
        }).catch(function (err) {
            res.status(500).json({ message: err.message });
        });
    } else {
        // forbidden without token
        res.status(401).json({ message: "Unauthorized to verify this content" });
    }
};

module.exports.getFromRequest = function (req) {
    return req.body.token || req.query.token || req.headers['x-access-token'];
};
//# sourceMappingURL=auth.js.map