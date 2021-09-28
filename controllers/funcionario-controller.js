const mysql = require( '../mysql' )
const bcrypt = require( 'bcrypt' );

exports.postFuncionario = async ( req, res ) => {
    try {
        const queryEmail = 'SELECT * FROM funcionario WHERE email = ?';
        const results = await mysql.execute(queryEmail, [req.body.email]);
        if (results.length > 0) {
            return res.status(409).send({ Mensagem: 'Usuario já cadastrado' })
        }
        const hash = await bcrypt.hash( req.body.senha, 10 );

        const query = 'INSERT INTO funcionario (nome_funcionario, email, login, senha, id_estabelecimento) VALUES (?, ?, ?, ?, ?)';
        const result = await mysql.execute(query,
            [
                req.body.nome_funcionario,
                req.body.email,
                req.body.login,
                hash,
                req.body.id_estabelecimento
            ] );

        const response = {
            mensagem: 'Funcionario inserido com sucesso',
            funcionarioInserido: {
                id_funcionario: result.insertId,
                nome_funcionario: req.body.nome_funcionario,
                email: req.body.email,
                login: req.body.login,
                hash: hash,
                id_estabelecimento: req.body.id_estabelecimento

            }
        }
        return res.status( 201 ).send( response );
    } catch ( error ) {
        console.log(error)
        return res.status( 500 ).send( { error: error } );
    }

};

exports.getFunc = async ( req, res ) => {

    try {
        const query = 'SELECT * FROM funcionario'

        await mysql.execute( query, ( error, results ) => {
            if ( error ) {
                return res.status( 500 ).send( { Erro: error } )
            }
            const response = {
                quantidade: results.length,
                funcionarios: results.map( prod => {
                    return {
                        id_funcionario: prod.id_funcionario,
                        nome: prod.nome,
                        email: prod.email,
                        login: prod.login
                    }
                } )
            }

            return res.status( 200 ).send( response )
        } )

    } catch ( error ) {
        return res.status( 500 ).send( error )
    }
}

exports.getCount = async ( req, res ) => {
    try {
        const query = 'SELECT COUNT(login) AS NumeroFuncionario FROM funcionario;'

        await mysql.execute( query, ( error, results ) => {
            if ( error ) {
                return res.status( 500 ).send( { Erro: error } )
            }
            const response = {
                quantidade: results
            }
            return res.status( 200 ).send( response )
        } )



    } catch ( error ) {
        return res.status( 500 ).send( error )
    }
}

exports.verifica = async ( req, res ) => {
    try {
        const query = 'SELECT * FROM funcionario WHERE nome = ?;';

        const result = await mysql.execute( query, [ req.body.nome ] );
        if ( result.length == 1 ) {
            const response = {
                id_funcionario: result[ 0 ].id_funcionario,
                nome: result[ 0 ].nome,
                email: result[ 0 ].email,
                login: result[ 0 ].login
            }

            return res.status( 200 ).send( response );

        }
        else {
            const response = {
                Mensagem: 'Funcionario não encontrado'
            }

            return res.status( 404 ).send( response );

        }

    }
    catch ( error ) {
        return res.status( 500 ).send( { erro: error } )
    }

}

exports.deleteFunc = async ( req, res ) => {
    try {
        const query = 'DELETE from funcionario WHERE id_funcionario = ?'
        await mysql.execute( query, [ req.body.id_funcionario ] );
        if ( error ) {
            return res.status( 500 ).send( { Erro: error } )
        }
        const response = {
            mensagem: 'Funcionario removido com sucesso'
        }

        return res.status( 200 ).send( response );
    }
    catch ( error ) {
        return res.status( 500 ).send( error )
    }

}

exports.patchFunc = async ( req, res ) => {
    try {
        const query = 'UPDATE funcionario SET nome =? WHERE email=?;'
        await mysql.execute( query,
            [
                req.body.nome,
                req.body.email
            ] );
        const response = {
            mensagem: 'Funcionario atualizado com sucesso',
            funcionarioAtualizado: {
                nome: req.body.nome
            }
        }

        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { Erro: error } )
    }
}