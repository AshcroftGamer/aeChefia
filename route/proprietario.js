const express = require( 'express' );
const prop = express.Router();
const bd = require( '../mysql' ).pool;


prop.get( '/', ( req, res ) => {
    bd.getConnection( ( err, conn ) => {
        if ( err ) {
            return res.status( 500 ).send( { erro: err } )
        }
        conn.query( 'SELECT * FROM proprietario;',
            ( err, result, fields ) => {
                if ( err ) {
                    return res.status( 500 ).send( { erro: err } )
                }
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





prop.post( '/cadastro', ( req, res ) => {
    console.log( req.body )
    bd.getConnection( ( err, conn ) => {
        if ( err ) {
            return res.status( 500 ).send( { erro: err } )
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
                    return res.status( 500 ).send( { erro: err } )
                }
                const response = {
                    mensagem: 'Conta criada com sucesso!',

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
                error: err
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
                        erro: err
                    } )
                }
                else {

                    const response = {
                        mensagem: 'Dados alterados com sucesso!',
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
                erro: error
            } )
        }
        conn.query( 'UPDATE proprietario SET nome = ?, telefone = ?,senha  = ? where id_proprietario = ?',
            [
                req.body.nome,
                req.body.telefone,
                req.body.senha,
                req.params.ide
            ],
            (error, results) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                        erro: error
                    })
                }
                const response = {
                    mensagem: 'Usuario atualizado com sucesso!'
                }

                return res.status(500).send(response)
            }
        )
    } )
} )



prop.delete( '/remove/:id', ( req, res ) => {
    let id = req.params.id;
    bd.getConnection( ( err, conn ) => {
        if ( err ) {
            res.status( 500 ).send( {
                erro: err
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
                        erro: err
                    } )
                }
                const response = {
                    mensagem: 'Usuario removido do sistema!',
                }

                return res.status( 500 ).send( response )
            }
        )
    } )

} );


module.exports = prop;