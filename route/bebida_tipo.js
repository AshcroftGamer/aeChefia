const route = require('express').Router();
const controller = require('../controllers/bebida_tipo_control')



route.get('/:nome_tipo', controller.getUma);

route.get('/',  controller.getAll);

//teste

module.exports = route;