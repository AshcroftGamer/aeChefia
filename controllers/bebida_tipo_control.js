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