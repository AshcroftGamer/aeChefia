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

exports.getUma = async(req, res) => {
    try {
        const query = `SELECT * FROM medidas WHERE medida = ?;`
        
        const result = await mysql.execute( query, [req.params.medida ] );

        const response = {
            quantidade: result.length,
            medidas: result.map( mede => {
                return{
                    id_medidas: mede.id_medidas,
                    medida: mede.nome_tipo
                }
            })

            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { Erro: error } )
    }

}

exports.getMedidas = async(req, res) => {
    try {
        const query = `SELECT * FROM medidas WHERE id_medidas = ?;`
        
        const result = await mysql.execute( query, [req.params.id_medidas ] );

        const response = { 
            medidas: result.map( mede => {
                return{
                    id_medidas: mede.id_medidas,
                    medida: mede.medida
                }
            })

            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { Erro: error } )
    }

}