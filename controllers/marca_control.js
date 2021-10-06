const mysql = require( '../mysql' );


exports.getUma = async(req, res) => {
    try {
        const query = `SELECT * FROM marcas WHERE nome_marca = ?;`
        
        const result = await mysql.execute( query, [req.params.nome_marca ] );

        const response = {
            marcas: result.map( mar => {
                return{
                    id_marcas: mar.id_marcas,
                    marca: mar.nome_marca
                }
            })

            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { error: error } )
    }

}


exports.getMarca = async(req, res) => {
    try {
        const query = `SELECT * FROM marcas WHERE id_marcas= ?;`
        
        const result = await mysql.execute( query, [req.params.id_marcas ] );

        const response = {
            marcas: result.map( mar => {
                return{
                    id_marcas: mar.id_marcas,
                    marca: mar.nome_marca
                }
            })

            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { error: error } )
    }

}