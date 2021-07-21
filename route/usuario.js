const user = require( 'express' ).Router();
const bd = require( '../mysql' ).pool;
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );

user.post( '/login', ( req, res, next ) => {
    bd.getConnection( ( error, conn ) => {
        if ( error ) { return res.status( 500 ).send( { error: error } ) }

        conn.query( `SELECT * FROM proprietario WHERE email = ?;`,
            [
                req.body.email
            ],
            ( error, results, fields ) => {
                conn.release();
                if ( error ) { return res.status( 500 ).send( { error: error } ) }


                if ( results.length < 1 ) {
                    console.log("entrou if passou")
                    return res.status( 401 ).send( { mensagem: 'Falha na autenticação'} )
                }
               

                bcrypt.compare( req.body.senha, results[ 0 ].senha, ( error, result ) => {
                    // console.log(result)
                    if ( error ) {
                        // console.log(result)
                        return res.status( 401 ).send( { mensagem: 'Falha na autenticação'} )
                        
                    }
                    if ( result ) {
                        const token = jwt.sign( {
                            id_proprietario: results[0].id_proprietario,
                            email: results[ 0 ].email
                        }, process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );


                        return res.status( 200 ).send( {
                            mensagem: 'Autenticado com sucesso',
                            token: token
                        } )
                    }
                    return res.status( 401 ).send( { mensagem: 'Falha na autenticação' } )
                } )
            } )
    } )
} )


module.exports = user;