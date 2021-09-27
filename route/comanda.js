const route = require('express').Router();
const controller = require('../controllers/comanda_control');

route.post('/cadastro', controller.postComanda);

route.get('/todos', controller.getComanda)

module.exports = route;