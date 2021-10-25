const route = require( 'express' ).Router();

const controller = require( '../controllers/itens_do_cardapio' );

route.get('/bebida', (req, res) => {
    res.sendFile(__basedir + '/public/pages/buscar-bebida.html')
});

route.get('/comida', (req, res) => {
    res.sendFile(__basedir + '/public/pages/buscar-comida.html')
})


route.get( '/todos', controller.getTodos );

route.post( '/cadastro', controller.postItens );

route.get( '/verifica', controller.verifica );

route.get('/', controller.getItens);

route.get('/:id_item_tipo', controller.getItensTipo);

route.get('/unico/:id_itens_do_cardapio', controller.getUmItem);


route.delete( '/remover/:id_itens_do_cardapio', controller.deleteItens );

route.patch( '/atualizar/:id_itens_do_cardapio/:preco', controller.patchItens );

module.exports = route;