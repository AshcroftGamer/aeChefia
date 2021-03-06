const route = require('express').Router();
const controller = require('../controllers/comanda_control');

route.get('/cliente',  (req, res) => {
    res.sendFile(__basedir + '/public/pages/abrir-caixa-cliente.html');
});

route.get('/mesa',  (req, res) => {
    res.sendFile(__basedir + '/public/pages/adicionar-cliente-a-mesa.html');
});

route.get('/sucesso',  (req, res) => {
    res.sendFile(__basedir + '/public/pages/cliente-sucesso.html');
});

route.get('/fechar',  (req, res) => {
    res.sendFile(__basedir + '/public/pages/fechar-comanda.html');
});


route.post('/cadastro', controller.postComanda);

route.get('/todos', controller.getComanda);

route.get('/cliente/:mesa/:id_estabelecimento', controller.getCliente);

route.patch('/atualizar/:id_comanda/:id_estabelecimento', controller.patchMesa)



module.exports = route;