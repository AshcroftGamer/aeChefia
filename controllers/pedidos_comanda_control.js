
const mysql = require( '../mysql' );


exports.postPedido = async ( req, res ) => {
    try {



        const query = 'INSERT INTO pedidos_comanda (id_comanda, quant, id_itens_do_cardapio, id_funcionario) VALUES (?, ?, ?, ?);'
        await mysql.execute( query,
            [
                req.body.id_comanda,
                req.body.quant,
                req.body.id_itens_do_cardapio,
                req.body.id_funcionario
            ] );

        const response = {
            mensagem: 'Pedido inserido com sucesso'

        }

        return res.status( 201 ).send( response );
    }
    catch ( error ) {
        return res.status( 500 ).send( { err: error } )
    }

}


exports.getPedido = async ( req, res ) => {
    try {
        await mysql.execute( 'SELECT * FROM pedidos_comanda', ( error, results ) => {
            if ( error ) {
                return res.status( 500 ).send( { Erro: error } )
            }
            const response = {
                quantidade: results.length,
                cardapios: results.map( prod => {
                    return {
                        id_comanda: prod.id_comanda,
                        quant: prod.quant,
                        item_do_cardapio: prod.id_itens_do_cardapio,
                        funcionario: prod.id_funcionario
                    }

                } )
            }
            return res.status( 200 ).send( response );
        } )
    }
    catch ( error ) {

    }

}

exports.getSum = async ( req, res ) => {
    try {
        await mysql.execute( 'SELECT SUM(id_pedido) AS NumeroPedidos FROM pedidos_comanda', ( error, results ) => {
            if ( error ) {
                return res.status( 500 ).send( { Erro: error } )
            }
            const response = {
                quantidade: results
            }

            return res.status( 500 ).send( response );
        } )
    } catch ( error ) {

    }
}