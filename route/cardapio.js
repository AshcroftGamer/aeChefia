const route = require( 'express' ).Router();
const controller = require( '../controllers/cardapiocontrol' );

route.get( '/', ( req, res ) => {
    res.sendFile( __basedir + '/public/pages/cardapio.html' );
} )

route.get( '/todos', controller.getCardapio );

route.get( '/verifica', controller.verifica );

route.post( '/cadastro', controller.postCardapio );

route.patch( '/atualizar', controller.patchCardapio );

route.delete( '/remover', controller.deleteCardapio );


module.exports = route;