const route = require('express').Router();

route.get('/', (req, res) => {
    res.sendFile(__basedir + '/public/pages/mesas-disponiveis.html');
});

route.get('/retirada-de-caixa', (req, res) => {
    res.sendFile(__basedir + '/public/pages/abrir-caixa-retirada.html');
});

route.get('/fechar-caixa', (req, res) => {
    res.sendFile(__basedir + '/public/pages/fechar-caixa.html');
});


module.exports = route;