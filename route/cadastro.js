const sign = require( 'express' ).Router();
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

sign.post( '/estabelecimento', ( req, res ) => {
    console.log( req.body.nome )
    bd.getConnection( ( err, conn ) => {
        if ( err ) { return res.status( 500 ).send( { Error: err } ) }
        conn.query( 'INSERT INTO proprietario(nome, email, telefone, senha ) VALUES (?, ?, ?, ?)',
            [
                req.body.nome,
                req.body.email,
                req.body.telefone,
                req.body.senha
            ],
            ( err, result, fields ) => {
                conn.release();
                if ( err ) { return res.status( 500 ).send( { Error: err } ) }
                const response = {
                    mensagem: 'Proprietario criado com sucesso!',
                    Proprietario: {
                        nome: result.nome,
                        email: result.email,
                        tel: result.telefone
                    }
                }
                console.log( response )

                return res.status( 201 ).send( response )
            } )
    } )
} )
sign.post( '/funcionario', ( req, res ) => {
    bd.getConnection( ( err, conn ) => {
        if ( err ) { return res.status( 500 ).send( { Error: err } ) }
        conn.query( `
                    SELECT INTO estabelecimento (
                        nome_estabelecimento,
                        logo,
                        cep,
                        endereco, 
                        id_proprietario)
                    values
                        (?, ?, ?, ?, ?);`,
                    
                    (err, result, field) => {
                        if(err){return res.status(500).send({erro:err})}
                        const response = {
                            Mensagem: 'Estabelecimento criado com sucesso!'
                        }
                        return res.status(500).send(response)
                    }
        )
    } )
} )

sign.post( '/cardapio', ( req, res ) => {
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



module.exports = sign;