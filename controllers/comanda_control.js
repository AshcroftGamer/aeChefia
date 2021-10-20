
const mysql = require( '../mysql' );


exports.postComanda = async ( req, res ) => {
    try {



        const query = 'INSERT INTO comanda (mesa, cliente, telefone, status, id_estabelecimento) VALUES (?, ?, ?, ?, ?);'
        await mysql.execute( query,
            [
                req.body.mesa,
                req.body.cliente,
                req.body.telefone,
                req.body.status,
                req.body.id_estabelecimento
            ] );

        const response = {
            mensagem: 'Comanda criada com sucesso',
            cliente: {
                cliente: req.body.cliente,
                telefone: req.body.telefone,
                mesa: req.body.mesa,
                status: req.body.status,
                id_estabelecimento: req.body.id_estabelecimento
            }

        }

        return res.status( 201 ).send( response );
    }
    catch ( error ) {
        console.log(error)
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


exports.getCliente = async ( req, res ) => {
    try {
        const query = `SELECT * FROM comanda WHERE mesa = ? and id_estabelecimento = ?`
        
        const result = await mysql.execute( query, [req.params.mesa, req.params.id_estabelecimento] );

        const response = {
            quantidade: result.length,
            comanda: result.map( comand => {
                return{
                    id_comanda: comand.id_comanda,
                    cliente: comand.cliente,
                    disponibilidade: comand.status,
                    mesa: comand.mesa,
                    id_estabelecimento: comand.id_estabelecimento
                }
            })

            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { Erro: error } )
    }

}

exports.patchMesa = async ( req, res ) => {
    try {
        const query = `UPDATE comanda
        SET status = false
        WHERE id_comanda = ? and id_estabelecimento = ?;`
        
   await mysql.execute( query, [req.params.id_comanda, req.params.id_estabelecimento] );

        const response = {
            mensagem: 'Mesa Atualizada'
            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        console.log('entrei error')
        console.log(error)
        console.log(error)
        return res.status( 500 ).send( { error: error } )
    }

}



