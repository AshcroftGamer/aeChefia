const mysql = require( '../mysql' );


exports.getAll = async ( req, res ) => {
    try {
        await mysql.execute( 'SELECT * FROM medidas;', ( error, result ) => {
            if ( error ) {
                return res.status( 500 ).send( { Erro: error } )
            }
            const response = {
                quantidade: result.length,
                bebita_marca:  result.map( prod => {
                    return{
                        medida: prod.medida,
                        porcao: prod.porcao
                    }
                } )
            }
            return res.status( 200 ).send( response )
        } )
    } catch ( error ) {
        return res.status( 500 ).send( error )
    }
}