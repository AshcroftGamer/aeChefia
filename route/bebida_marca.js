const route = require('express').Router();
const controller = require('../controllers/bebida_marca_control')

route.get('/', controller.getAll);

//teste

module.exports = route;