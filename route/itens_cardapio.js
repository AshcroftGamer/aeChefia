const route = require( 'express' ).Router();

const controller = require( '../controllers/itens_do_cardapio' );


route.get( '/todos', controller.getTodos );

route.post( '/cadastro', controller.postItens );

route.get( '/verifica', controller.verifica );

route.get('/', controller.getItens)

route.get('/:id_item_tipo', controller.getItensTipo)


route.delete( '/remover', controller.deleteItens );

route.patch( '/atualizar', controller.patchItens );

module.exports = route;