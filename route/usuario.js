const user = require( 'express' ).Router();
const bd = require( '../mysql' ).pool;
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );

user.post( '/cadastro', ( req, res, next ) => {
    bd.getConnection( ( error, conn ) => {
        if ( error ) {
            return res.status( 500 ).send( { error: error } )
        }
        conn.query( 'SELECT * FROM proprietario WHERE email = ?', [ req.body.email ], ( error, result ) => {

            if ( error ) { return res.status( 500 ).send( { error: error } ) }
            if ( result.length > 0 ) { res.status( 409 ).send( { mensagem: 'Usuário já cadastrado' } ) }
            else {
                bcrypt.hash( req.body.senha, 10, ( errBcrypt, hash ) => {
                    if ( errBcrypt ) { return res.status( 500 ).send( { error: errBcrypt } ) }
                    conn.query( `INSERT INTO proprietario (email, senha) VALUES (?, ?)`,
                        [ req.body.email, hash ],
                        ( error, result ) => {
                            conn.release();
                            if ( error ) {
                                return res.status( 500 ).send( { error: error } )
                            }
                            response = {
                                mensagem: 'Proprietario criado com sucesso',
                                usuarioCriado: {
                                    id: result.insertId,
                                    email: req.body.email
                                }
                            }
                            return res.status( 201 ).send( response )
                        } )
                } )
            }
        } )

    } )
} )
user.post( '/login', ( req, res, next ) => {
    bd.getConnection( ( error, conn ) => {
        if ( error ) { return res.status( 500 ).send( { error: error } ) }
        const query = `SELECT * FROM proprietario WHERE email = ?`;
        conn.query( query, [ req.body.email ], ( error, result, fields ) => {
            conn.release();
            if ( error ) { return res.status( 500 ).send( { error: error } ) }
            if ( result.length < 1 ) {
                return res.status( 401 ).send( { mensagem: 'Falha na autenticação' } )
            }
            bcrypt.compare( req.body.senha, result[ 0 ].senha, ( error, result ) => {
                if ( error ) {
                    return res.status( 401 ).send( { mensagem: 'Falha na autenticação' } )
                }
                if ( result ) {
                    const token = jwt.sign( {
                        id: result[ 0 ].id,
                        email: result[ 0 ].email
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        } );


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

// user.post( '/funcionario', ( req, res, next ) => {
//     bd.getConnection( ( err, conn ) => {
//         if ( err ) { return res.status( 500 ).send( { Error: err } ) }
//         conn.query( `INSERT INTO funcionario (nome, email, login, senha) VALUES (?, ?, ?, ?);`,
//             [
//                 req.body.nome,
//                 req.body.email,
//                 req.body.login,
//                 req.body.senha
//             ],
//             ( err, result, fields ) => {
//                 if ( err ) { return res.status( 500 ).send( { Error: err } ) }
//                 const response = {
//                     nome: result[ 0 ].nome,
//                     email: result[ 0 ].email,
//                     login: result[ 0 ].login
//                 }

//                 return res.status( 500 ).send( response )
//             }

//         )
//     } )
// } )

module.exports = user;