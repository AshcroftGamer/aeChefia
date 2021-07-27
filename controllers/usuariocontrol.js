
const bcrypt = require( 'bcrypt' );
const bd = require( '../mysql' ).pool;
const jwt = require( 'jsonwebtoken' );

exports.loginUsuario = ( req, res, next ) => {

    bd.getConnection( ( error, conn ) => {
        if ( error ) { return res.status( 500 ).send( { error: error } ) }

        conn.query( `SELECT * FROM proprietario WHERE email = ?`,
            [
                req.body.email
            ],
            ( error, results ) => {

                // console.log(result)

                conn.release();
                if ( error ) { return res.status( 500 ).send( { error: error } ) }


                if ( results.length < 1 ) {

                    return res.status( 401 ).send( { mensagem: 'Falha na autenticação' } )

                }


                bcrypt.compare( req.body.senha, results[ 0 ].senha, ( error, result ) => {
                    // console.log(result)
                    if ( error ) {

                        return res.status( 401 ).send( { mensagem: 'Falha na autenticação' } )

                    }
                    if ( result ) {
                        console.log( result )
                        const token = jwt.sign( {
                            id_proprietario: results[ 0 ].id_proprietario,
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
}

exports.redSenha = ( req, res ) => {

    bd.getConnection( ( err, conn ) => {
        if ( err ) {
            return res.status( 500 ).send( { err: err } )
        }
        // conn.query( 'SELECT * FROM proprietario WHERE cpf = ?', [ req.body.cpf ], ( err, result ) => {
        conn.query( 'SELECT * FROM proprietario WHERE email = ? ', [ req.body.email], 
        ( err, results ) => {
            console.log( results )
            const id = results[ 0 ].id_proprietario;
            if ( err ) { return res.status( 500 ).send( { err: err } ) }
            if ( results.length < 1 ) {
                // res.status( 409 ).send( { mensagem: 'Usuário já cadastrado' } ) 
                bcrypt.hash( req.body.senha, 10, ( errBcrypt, hash ) => {
                    if ( errBcrypt ) {
                        return res.status( 500 ).send( { err: errBcrypt } )
                    }

                    conn.query( `UPDATE proprietario SET senha = ? WHERE id_proprietario = ${id}`,
                        [ hash ],
                        ( err, result ) => {
                            conn.release();
                            if ( err ) {
                                return res.status( 500 ).send( { err: err } )
                            }
                            const response = {
                                mensagem: 'Senha modificada com sucesso!'

                            }
                            // return res.status( 200 ).send( response ); //retorna o status do andamento
                            return res.status( 200 ).send(response  );  //retorna para a home
                        } )
                } )
            }
        } )

    } )
}