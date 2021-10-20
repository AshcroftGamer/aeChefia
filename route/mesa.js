const route = require('express').Router();

const controller = require('../controllers/mesa_control')

route.get('/', (req, res) => {
    res.sendFile(__basedir + '/public/pages/mesas-disponiveis.html');
});

route.get('/retirada-de-caixa', (req, res) => {
    res.sendFile(__basedir + '/public/pages/abrir-caixa-retirada.html');
});

route.get('/fechar-caixa', (req, res) => {
    res.sendFile(__basedir + '/public/pages/fechar-caixa.html');
});

route.post('/', controller.postValor);

route.get('/valor/:id_estabelecimento', controller.getUmCaixa);

route.get('/disponibilidade/:mesa/:id_estabelecimento', controller.getDisponibilidade);

module.exports = route;