const route = require( 'express' ).Router();
const prop = require( '../controllers/propcontrol' );


route.get( '/', ( req, res ) => {
    res.sendFile( __basedir + '/public/pages/home.html' );
} );


route.get( '/todos', prop.getProp );

route.get( '/:id_proprietario', prop.getUmProprietario );


route.get( '/verifica', prop.verifica );


route.post( '/cadastro', prop.postProprietario );


route.patch( '/atualizar', prop.patchProprietario );

route.delete( '/remover', prop.deleteProprietario )


module.exports = route;