const express = require('express');
const router = express.Router();
const validator = require('../validators/auth');
const service = require('../services/auth');
const controller = require('../controllers/auth');
const token = require('../middlewares/auth');

router.post('/authenticate', validator.authenticate, controller.authenticate);
router.post('/refresh/:refresh_token', token.authorization, validator.refresh, service.refresh, controller.refresh);
router.post('/requestPassword', token.authorization, validator.requestPassword, service.requestPassword, controller.requestPassword);
router.post('/changePassword', token.authorization, validator.changePassword, service.changePassword, controller.changePassword);



module.exports = router;