const sign = require( 'express' ).Router();
const bd = require( '../mysql' ).pool;
const multer = require( 'multer' );
const path = require( 'path' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );

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
sign.post( '/imagem', upload.single( 'imagem2' ), ( req, res ) => {
    console.log( req.body )
    console.log( req.file )
    bd.getConnection( ( err, conn ) => {
        if ( err ) {
            return res.status( 500 ).send( { err: err } )
        }
        return res.send( 'ok' )
    } )
} )

//com multipart deu erro
//FUNCIONANDO COM FORM URL ENCODED

sign.post( '/usuario', ( req, res ) => {
    // console.log( req.body )
    bd.getConnection( ( err, conn ) => {
        if ( err ) {
            return res.status( 500 ).send( { err: err } )
        }
        conn.query( 'SELECT * FROM proprietario WHERE email = ?', [ req.body.email ], ( err, result ) => {

            if ( err ) { return res.status( 500 ).send( { err: err } ) }
            if ( result.length > 0 ) { res.status( 409 ).send( { mensagem: 'Usuário já cadastrado' } ) }
            else {
                bcrypt.hash( req.body.senha, 10, ( errBcrypt, hash ) => {
                    if ( errBcrypt ) { return res.status( 500 ).send( { err: errBcrypt } ) }
                    conn.query( `INSERT INTO proprietario (nome, email, cpf, telefone, senha) VALUES (?, ?, ?, ?, ?)`,
                        [ req.body.nome, req.body.email, req.body.cpf, req.body.telefone, hash ],
                        ( err, result ) => {
                            conn.release();
                            if ( err ) {
                                return res.status( 500 ).send( { err: err } )
                            }
                            const response = {
                                mensagem: 'Proprietario criado com sucesso',
                                usuarioCriado: {
                                    id: result.insertId,
                                    nome: req.body.nome,
                                    email: req.body.email,
                                    cpf: req.body.cpf,
                                    telefone: req.body.telefone
                                }
                            }
                            // return res.status( 201 ).send( response ); //retorna o status do andamento
                            return res.status( 200 ).redirect( '/home' );  //retorna para a home
                        } )
                } )
            }
        } )

    } )
} )

// ATENÇÃO COM OS NOMES DOS CAMPOS DOS INPUTS DO BODY
sign.post( '/estabelecimento', upload.single('logo'), ( req, res ) => {
    console.log( req.body )
    bd.getConnection( ( err, conn ) => {
        const id = 38;
        if ( err ) { return res.status( 500 ).send( { err: err } ) }
        conn.query( `INSERT INTO estabelecimento ( nome_estabelecimento, logo, cep, endereco, 
            id_proprietario, mesa) values (?, ?, ?, ?, ?, ?);`,
                    [
                        req.body.nome_estabelecimento,
                        req.file.path,
                        req.body.cep,
                        req.body.endereco,
                        req.body.id_proprietario,
                        req.body.mesa
                    ],

                ( err, result, field ) => {
                    if ( err ) { return res.status( 500 ).send( { erro: err } ) }

                    const response = {
                        mensagem: 'Estabelecimento inserido com sucesso',
                        EstabelecimentoCriado: {
                            id_: result.id_produtos,
                            nome: req.body.nome,
                            preco: req.body.preco,
                            imagem_produto: req.file.path,
                            request: {
                                tipo: 'POST',
                                descricao: 'Insere um produto',
                                url: 'http://localhost:3000/produtos'
                            }
                        }
                    }

                    return res.status( 500 ).send( response )
                }
        )
    } )
} )

sign.post( '/cardapio', ( req, res ) => {
    console.log( req.body )
    bd.getConnection( ( err, conn ) => {
        if ( err ) {
            return res.status( 500 ).send( { err: err } )
        }
        conn.query( 'INSERT INTO cardapio (id_estabelecimento, id_cardapio ) VALUES (?, ?)',

            [
                req.body.nome, //ver como add as foreign keys
                req.body.email,
                
            ],


            ( err, result ) => {

                conn.release();
                if ( err ) {
                    return res.status( 500 ).send( { err: err } )
                }
                const response = {
                    mensagem: 'Conta criada com sucesso!'

                }
                return res.status( 200 ).send( response );
            }
        )
    } )
} )
sign.post( '/funcionario', ( req, res ) => {
    console.log( req.body )
    bd.getConnection( ( err, conn ) => {
        if ( err ) {
            return res.status( 500 ).send( { err: err } )
        }
        conn.query( 'INSERT INTO funcionario (nome, email, login, senha ) VALUES (?, ?, ?, ?)',

            [
                req.body.nome,
                req.body.email,
                req.body.login,
                req.body.senha
            ],


            ( err, result ) => {

                conn.release();
                if ( err ) {
                    return res.status( 500 ).send( { err: err } )
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