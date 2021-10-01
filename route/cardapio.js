const route = require( 'express' ).Router();
const controller = require( '../controllers/cardapiocontrol' );

route.get( '/', ( req, res ) => {
    res.sendFile( __basedir + '/public/pages/cardapio.html' );
} )

route.get( '/zerado', ( req, res ) => {
    res.sendFile( __basedir + '/public/pages/cardapio-zerado.html' );
} )

route.get('/bebida', (req, res) => {
    res.sendFile(__basedir + '/public/pages/bebida.html');
})

route.get('/bebida/sucesso', (req, res) => {
    res.sendFile(__basedir + '/public/pages/bebida-sucesso.html');
})

route.get('/bebida/buscar', (req, res) => {
    res.sendFile(__basedir + '/public/pages/buscar-bebida.html');
})

route.get('/comida', (req, res) => {
    res.sendFile(__basedir + '/public/pages/comida.html');
})

route.get('/comida/sucesso', (req, res) => {
    res.sendFile(__basedir + '/public/pages/comida-sucesso.html');
})

route.get('/lista', (req, res) => {
    res.sendFile(__basedir + '/public/pages/lista-item-cardapio.html');
})


route.get( '/todos', controller.getCardapio );

route.get( '/quantidade/:id_estabelecimento', controller.getQuantidade);

route.get( '/verifica/:id_estabelecimento', controller.verifica );

route.get( '/item/:id_cardapio', controller.getItem);

route.post( '/cadastro/:id_estabelecimento', controller.postCardapio );

route.patch( '/atualizar', controller.patchCardapio );

route.delete( '/remover', controller.deleteCardapio );


module.exports = route;