const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const service = require('../services/users');
const validator = require('../validators/users');
const token = require('../middlewares/auth');

router.get('/', token.authorization, token.permissions(['admin','super']), controller.findAll);
router.get('/:id', token.authorization, token.permissions(['admin','super']), validator.find, controller.find);
router.post('/', validator.create, service.create, controller.create);
router.put('/:id',  token.authorization, token.permissions(['user','admin','super']), validator.update, service.update, controller.update);
router.delete('/:id', token.authorization, token.permissions(['super']), validator.delete, service.delete, controller.delete);


module.exports = router;