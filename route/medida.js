const route = require('express').Router();
const controller = require('../controllers/medidas_control')

route.get('/:medida', controller.getUma);

route.get('/', controller.getAll);

route.get('/pegar/:id_medidas', controller.getMedidas)

module.exports = route;