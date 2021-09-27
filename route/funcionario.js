const route = require('express').Router();

const controller = require('../controllers/funcionario-controller');

route.get('/', (req, res) => {
    res.sendFile(__basedir + '/public/pages/funcionario.html');
})


route.post('/cadastro', controller.postFuncionario);

route.get('/todos', controller.getFunc);

route.get('/verifica', controller.verifica);

route.get('/quant', controller.getCount);

route.delete('/remover', controller.deleteFunc);

route.patch('/atualizar', controller.patchFunc);

module.exports = route;