const route = require( 'express' ).Router();
const controller = require( '../controllers/pedidos_comanda_control' )


route.post( '/cadastro', controller.postPedido );

route.get( '/todos', controller.getPedido );

route.get('/sum', controller.getSum);


module.exports = route;