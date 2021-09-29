const route = require('express').Router();
const controller = require('../controllers/medidas_control')

route.get('/:medida', controller.getUma);

route.get('/', controller.getAll);

module.exports = route;