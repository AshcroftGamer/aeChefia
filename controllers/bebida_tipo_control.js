const mysql = require( '../mysql' );


exports.getAll = async ( req, res ) => {
    try {
        await mysql.execute( 'SELECT * FROM bebida_tipo', ( error, result ) => {
            if ( error ) {
                return res.status( 500 ).send( { Erro: error } )
            }
            const response = {
                quantidade: result.length,
                bebita_tipo:  result.map( prod => {
                    return{
                        nome: prod.nome_tipo
                    }
                } )
            }
            return res.status( 200 ).send( response )
        } )
    } catch ( error ) {
        return res.status( 500 ).send( error )
    }
}

exports.getUma = async(req, res) => {
    try {
        const query = `SELECT * FROM bebida_tipo WHERE nome_tipo = ?;`
        
        const result = await mysql.execute( query, [req.params.nome_tipo ] );

        const response = {
            quantidade: result.length,
            bebida: result.map( bebe => {
                return{
                    id_bebida_tipo: bebe.id_bebida_tipo,
                    nome_tipo: bebe.nome_tipo
                }
            })

            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { Erro: error } )
    }

}