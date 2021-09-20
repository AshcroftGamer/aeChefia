const route = require('express').Router();

const controller = require('../controllers/itens_do_cardapio');


route.get('/todos', controller.getTodos);

route.post('/cadastro', controller.postItens);

route.get('/verifica', controller.verifica);

route.delete('/remover', controller.deleteItens);

module.exports = route;