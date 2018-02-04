const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');
const service = require('../services/products');
const validator = require('../validators/products');
const token = require('../middlewares/auth');

router.get('/',  controller.findAll); //paginate
router.get('/:id', validator.find, controller.find);
router.get('/manufacturers/:id', validator.findAllByManufacturer, controller.findAllByManufacturer); //paginate
router.get('/category/:id', validator.findAllByCategory, controller.findAllByCategory); //paginate

router.post('/', token.authorization, token.permissions(['admin','super']), validator.create, service.create, controller.create);
router.put('/:id', token.authorization, token.permissions(['super']), validator.update, service.update, controller.update);
router.delete('/:id', token.authorization, token.permissions(['super']), validator.delete, service.delete, service.delete, controller.delete);


module.exports = router;