const sign = require('express').Router();
const bd = require( '../mysql' ).pool;
const multer = require( 'multer' );
const path = require( 'path' )

sign.get('/', (req, res) => {
    res.send('Bem vindo a rota cadastro')
})


sign.post('/admin', (req, res) => {
    console.log(req.body.nome)
    bd.getConnection((err, conn) =>{
        if(err){return res.status(500).send({Error: err}) }
        conn.query('INSERT INTO proprietario(nome, email, telefone, senha ) VALUES (?, ?, ?, ?)',
        [
            req.body.nome,
            req.body.email,
            req.body.telefone,
            req.body.senha
        ],
        (err, result, fields) => {
            conn.release();
            if(err){return res.status(500).send({Error: err})}
            const response= {
                mensagem: 'Proprietario criado com sucesso!',
                Proprietario:{
                    nome: result.nome,
                    email: result.email,
                    tel: result.telefone
                }
            }
            console.log(response)

            return res.status(201).send(response)
        } )
    })
})

sign.post( '/prop', ( req, res ) => {
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