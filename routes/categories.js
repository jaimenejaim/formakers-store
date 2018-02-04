const express = require('express');
const router = express.Router();
const controller = require('../controllers/categories');
const service = require('../services/categories');
const validator = require('../validators/categories');
const token = require('../middlewares/auth');

router.get('/',  controller.findAll);
router.get('/:id', validator.find, controller.find);
router.post('/',token.authorization, token.permissions(['super']), validator.create, service.create, controller.create);
router.put('/:id',token.authorization, token.permissions(['super']), validator.update, service.update, controller.update);
router.delete('/:id',token.authorization, token.permissions(['super']), validator.delete, service.delete, controller.delete);



module.exports = router;