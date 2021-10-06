const route = require('express').Router();
const controller = require('../controllers/marca_control')

route.get('/:nome_marca', controller.getUma);

//route.get('/', controller.getAll);

route.get('/pegar/:id_marcas', controller.getMarca);

module.exports = route;