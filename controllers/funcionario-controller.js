const mysql = require( '../mysql' )
const bcrypt = require( 'bcrypt' );

exports.postFuncionario = async ( req, res ) => {
    try {
        const hash = await bcrypt.hashSync( req.body.senha, 10 );

        const query = 'INSERT INTO funcionario (nome, email, login, senha, id_estabelecimento ) VALUES (?, ?, ?, ?, ?)';
        await mysql.execute( query,
            [
                req.body.nome,
                req.body.email,
                req.body.login,
                hash,
                req.body.id_estabelecimento
            ] );

        const response = {
            mensagem: 'Funcionario inserido com sucesso',
            funcionarioInserido: {
                nome: req.body.nome,
                email: req.body.email,
                login: req.body.login
                
            }
        }
        return res.status( 201 ).send( response );

    } catch ( error ) {

        return res.status( 500 ).send( { error: error } );

    }

};