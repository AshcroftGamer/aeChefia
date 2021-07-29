
const bcrypt = require( 'bcrypt' );
const bd = require( '../mysql' );
const bd2 = require( '../mysql' ).pool;

exports.postUsuario = ( req, res ) => {
    try {
        
    } catch (error) {
        
    }
    bd2.getConnection( ( err, conn ) => {
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
}


// Funciona apenas com form data ou multipart data
exports.postEstabelecimento = async ( req, res ) => {

    try {
        const query = `INSERT INTO estabelecimento ( nome_estabelecimento, logo, cep, 
                       endereco, mesa, id_proprietario) values (?, ?, ?, ?, ?, ?);`;
        await bd.execute( query,
            [
                req.body.nome_estabelecimento,
                req.file.path,
                req.body.cep,
                req.body.endereco,
                req.body.mesa,

                req.body.id_proprietario
            ] );
        const response = {
            mensagem: 'Estabelecimento inserido com sucesso',
        }

        return res.status( 200 ).redirect()
    } catch ( err ) {
        return res.status( 500 ).send( { err: err } )
    }
}

//Funcionou com Form URL Encoded
exports.postCardapio = async ( req, res ) => {
    try {
        const query = "INSERT INTO cardapio ( id_cardapio , id_estabelecimento) VALUES (?, ?)";
        await bd.execute(query, 
            [
                req.body.id_cardapio,
                req.body.id_estabelecimento
            ]);
            const response = {
                mensagem: 'Cardapio adicionado com sucesso!'

            }
            return res.status( 200 ).send( response );

    } catch (error) {
        return res.status( 500 ).send( { error: error } )
    }
    
}
//Funcionou com Form URL Encoded
exports.postFuncionario = async ( req, res ) => {

    try {
        const query = "INSERT INTO funcionario (nome, email, login, senha, id_estabelecimento ) VALUES (?, ?, ?, ?, ?)";
        await bd.execute(query, 
            [
                req.body.nome,
                req.body.email,
                req.body.login,
                req.body.senha,
                req.body.id_estabelecimento
            ])
            const response = {
                mensagem: 'Conta criada com sucesso!'

            }
            return res.status( 200 ).send( response );
    } catch (error) {
        return res.status( 500 ).send( { err: error } )
    }

    
}