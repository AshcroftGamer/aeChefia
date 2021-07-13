const prop = require( 'express' ).Router();
const bd = require( '../mysql' ).pool;
const multer = require( 'multer' );
const path = require( 'path' )

const storage = multer.diskStorage( {
    destination: ( req, file, cb ) => {
        cb( null, 'uploads/' )
    },
    filename: ( req, file, cb ) => {
        cb( null, file.originalname )
    }
} )
const upload = multer( { storage } )

// ----- ROTA DE TESTE DE UPLOAD DE IMAGENS -----
// prop.post( '/sing', upload.single( 'imagem2' ), ( req, res ) => {
//     console.log( req.body )
//     console.log( req.file )
//     bd.getConnection( ( err, conn ) => {
//         if ( err ) {
//             return res.status( 500 ).send( { Error: err } )
//         }
//         res.send( 'ok' )
//     } )
// } )


// prop.get( '/login', ( req, res ) => {
//     console.log('entrou')
//     console.log(req.body.email)
//     console.log('saiu')

//     bd.getConnection( ( err, conn ) => {
//         if ( err ) { return res.status( 500 ).send( { Erro: err } ) }
//         conn.query( 'select email, senha from proprietario;',
//         [
//             req.body.email, req.body.senha 
//         ],
//             ( err, result, fields ) => {
//                 console.log(result)
//                 if ( err ) { return res.status( 500 ).send( { Error: err } ) }
//                 if (result.email === req.body.email && result.senha === req.body.senha){
//                     return res.send('Bem vindo')
//                 }
//                 else{res.send('Cai fora')}
//             }
//         )
//     } )
// } )

prop.get( '/login', ( req, res ) => {
    console.log('entrou')
    console.log(req.body.email)
    console.log('saiu')
    bd.getConnection( ( err, conn ) => {
        if ( err ) { return res.status( 500 ).send( { Error: err } ) }
        conn.query( 'SELECT * FROM  proprietario WHERE email = ?;',
        [req.body.email],
        
            ( err, result, fields ) => {
                // console.log(result.map())
                if ( err ) { return res.status( 500 ).send( { Error: err } ) }
                res.status(200).send('ok')
            }
        )
    } )
} )



prop.get( '/', ( req, res ) => {
    bd.getConnection( ( err, conn ) => {
        if ( err ) {  return res.status( 500 ).send( { Error: err } )  }
        conn.query( 'SELECT * FROM proprietario;',
            ( err, result, fields ) => {
                if ( err ) { return res.status( 500 ).send( { Error: err } ) }
                const response = {
                    proprietario: result.map( data => {
                        return {
                            id_proprietario: data.id_proprietario,
                            nome: data.nome,
                            email: data.email,
                            telefone: data.telefone,
                            senha: data.senha

                        }
                    } )


                }
                return res.status( 200 ).send( response );
            }
        )
    } )
} )

//o POST deve ser feito com Form URL Encoded 
//se for com multipart Form data erro no insert
prop.post( '/sign', ( req, res ) => {
    console.log( req.body )
    bd.getConnection( ( err, conn ) => {
        if ( err ) {
            return res.status( 500 ).send( { Error: err } )
        }
        conn.query( 'INSERT INTO proprietario (nome, email, telefone, senha ) VALUES (?, ?, ?, ?)',

            [
                req.body.nome,
                req.body.email,
                req.body.telefone,
                req.body.senha
            ],


            ( err, result ) => {

                conn.release();
                if ( err ) {
                    return res.status( 500 ).send( { Error: err } )
                }
                const response = {
                    mensagem: 'Conta criada com sucesso!'

                }
                return res.status( 200 ).send( response );
            }
        )
    } )
} )

prop.patch( '/update/:id', ( req, res ) => {
    // let id = req.params.id;
    bd.getConnection( ( err, conn ) => {
        if ( err ) {
            return res.status( 500 ).send( {
                Error: err
            } )
        }
        conn.query( `UPDATE proprietario
                    SET nome                  = ?,
                        telefone              = ?,
                        senha                 = ?
                        where id_proprietario = ?`,
            [
                req.body.nome,
                req.body.telefone,
                req.body.senha,
                req.params.id
            ],
            ( err, result ) => {

                conn.release();
                console.log( 'entrous' )
                console.log( err )
                console.log( 'saiu' )

                if ( err ) {
                    res.status( 500 ).send( {
                        Error: err
                    } )
                }
                else {

                    const response = {
                        mensagem: 'Dados alterados com sucesso!'
                    };

                    return res.status( 202 ).send( response );
                }

            } )

    } )

} )

prop.put( '/update/:ide', ( req, res ) => {
    bd.getConnection( ( error, conn ) => {
        if ( error ) {
            return res.status( 500 ).send( {
                Error: error
            } )
        }
        conn.query( 'UPDATE proprietario SET nome = ?, telefone = ?,senha  = ? where id_proprietario = ?',
            [
                req.body.nome,
                req.body.telefone,
                req.body.senha,
                req.params.ide
            ],
            ( error, results ) => {
                conn.release();

                if ( error ) {
                    return res.status( 500 ).send( {
                        Error: error
                    } )
                }
                const response = {
                    mensagem: 'Usuario atualizado com sucesso!'
                }

                return res.status( 500 ).send( response )
            }
        )
    } )
} )

prop.delete( '/remove/:id', ( req, res ) => {
    let id = req.params.id;
    bd.getConnection( ( err, conn ) => {
        if ( err ) {
            res.status( 500 ).send( {
                Error: err
            } )
        }
        conn.query(
            `DELETE FROM proprietario WHERE id_proprietario = ?`,
            [
                id
            ],
            ( err, result, field ) => {
                conn.release();
                if ( err ) {
                    res.status( 500 ).send( {
                        Error: err
                    } )
                }
                const response = {
                    mensagem: 'Usuario removido do sistema!'
                }

                return res.status( 500 ).send( response )
            }
        )
    } )

} );


module.exports = prop;