'use strict';

var express = require('express');
var router = express.Router();
var validator = require('../validators/auth');
var service = require('../services/auth');
var controller = require('../controllers/auth');
var token = require('../middlewares/auth');

router.post('/authenticate', validator.authenticate, controller.authenticate);
router.post('/refresh/:refresh_token', token.authorization, validator.refresh, service.refresh, controller.refresh);
router.post('/requestPassword', token.authorization, validator.requestPassword, service.requestPassword, controller.requestPassword);
router.post('/changePassword', token.authorization, validator.changePassword, service.changePassword, controller.changePassword);

module.exports = router;
//# sourceMappingURL=auth.js.map