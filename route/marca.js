const route = require('express').Router();
const controller = require('../controllers/marca_control')

route.get('/:nome_marca', controller.getUma);

//route.get('/', controller.getAll);

module.exports = route;