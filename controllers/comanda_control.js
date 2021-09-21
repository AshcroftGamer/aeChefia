
const mysql = require( '../mysql' );


exports.postComanda = async ( req, res ) => {
    try {



        const query = 'INSERT INTO comanda (mesa, cliente, telefone, status) VALUES (?, ?, ?, ?);'
        await mysql.execute( query,
            [
                req.body.mesa,
                req.body.cliente,
                req.body.telefone,
                req.body.status
            ] );

        const response = {
            mensagem: 'Comanda criada com sucesso',
            cliente: {
                cliente: req.body.cliente,
                telefone: req.body.telefone,
                mesa: req.body.mesa,
                status: req.body.status
            }

        }

        return res.status( 201 ).send( response );
    }
    catch ( error ) {
        return res.status( 500 ).send( { err: error } )
    }

}


exports.getComanda = async ( req, res ) => {
    try {
        await mysql.execute( 'SELECT * FROM comanda', ( error, results ) => {
            if ( error ) {
                return res.status( 500 ).send( { Erro: error } )
            }
            const response = {
                quantidade: results.length,
                comandas: results.map( prod => {
                    return {
                        id_comanda: prod.id_comanda,
                        cliente: prod.cliente,
                        telefone: prod.telefone,
                        status: prod.status
                    }

                } )
            }
            return res.status( 200 ).send( response );
        } )
    }
    catch ( error ) {
        return res.status( 500 ).send( { Erro: error } )
    }

}


