
const mysql = require( '../mysql' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );


exports.postProprietario = async ( req, res ) => {
    try {
        var query = 'SELECT * FROM proprietario WHERE email = ?';
        var result = await mysql.execute( query, [ req.body.email ] );
        if ( result.length > 0 ) {
            return res.status( 409 ).send( { Mensagem: 'Usuario já cadastrado' } )
        }
        const hash = await bcrypt.hashSync( req.body.senha, 10 );

        query = 'INSERT INTO proprietario (nome, email, cpf, telefone, senha) VALUES (?, ?, ?, ?, ?)';
        const results = await mysql.execute( query,
            [
                req.body.nome,
                req.body.email,
                req.body.cpf,
                req.body.telefone,
                hash
            ] )
        const response = {
            mensagem: 'Proprietario criado com sucesso',
            usuarioCriado: {
                id: results.insertId,
                nome: req.body.nome,
                email: req.body.email,
                cpf: req.body.cpf,
                telefone: req.body.telefone
            }
        }

        return res.status( 201 ).send( response );
    }
    catch ( error ) {
        return res.status( 500 ).send( { err: error } )
    }

}

// exports.postProprietario = async ( req, res ) => {
//     try {



//         const query = 'INSERT INTO proprietario (nome, email, cpf, telefone, senha) VALUES (?, ?, ?, ?, ?);'
//         const result = await mysql.execute( query,
//             [
//                 req.body.nome,
//                 req.body.email,
//                 req.body.cpf,
//                 req.body.telefone,
//                 req.body.senha
//             ] );

//         const response = {
//             mensagem: 'Proprietario criado com sucesso',
//             usuarioCriado: {
//                 id: result.insertId,
//                 nome: req.body.nome,
//                 email: req.body.email,
//                 cpf: req.body.cpf,
//                 telefone: req.body.telefone
//             }
//         }

//         return res.status( 201 ).send( response );
//     }
//     catch ( error ) {
//         return res.status( 500 ).send( { err: error } )
//     }

// }

exports.patchProprietario = async ( req, res ) => {
    try {
        const query = 'UPDATE proprietario SET nome = ? WHERE email = ?;'
        const result = await mysql.execute( query,
            [
                req.body.nome,
                req.body.cpf,
                req.body.telefone,
                req.body.email
            ] );
        console.log( result.length )
        const response = {
            mensagem: 'Proprietario atualizado com sucesso',
            usuarioCriado: {
                id: result.insertId,
                nome: req.body.nome,
                cpf: req.body.cpf,
                telefone: req.body.telefone,
                email: req.body.email
            }
        }

        return res.status( 201 ).send( response );
    }
    catch ( error ) {
        return res.status( 500 ).send( error )
    }

}

exports.deleteProprietario = async ( req, res ) => {
    try {


        const query = 'DELETE from proprietario WHERE id_proprietario = ?'
        const result = await mysql.execute( query, [ req.body.id_proprietario ] );
        console.log( result.length )
        const response = {
            mensagem: 'Proprietario removido com sucesso',
            usuarioCriado: {
                id: result[ 0 ].insertId,
                nome: result[ 0 ].nome,
                cpf: result[ 0 ].cpf,
                telefone: result[ 0 ].telefone,
                email: result[ 0 ].email
            }
        }

        return res.status( 201 ).send( response );
    }
    catch ( error ) {
        return res.status( 500 ).send( error )
    }

}


exports.getProp = async ( req, res ) => {
    try {
        await mysql.execute( 'SELECT * FROM proprietario', ( error, results ) => {
            if ( error ) {
                return res.status( 500 ).send( { Erro: error } )
            }
            const response = {
                quantidade: results.length,
                proprietarios: results.map( prod => {
                    return {
                        id_proprietario: prod.id_proprietario,
                        nome: prod.nome,
                        email: prod.email,
                        cpf: prod.cpf,
                        telefone: prod.telefone,
                        senha: prod.senha
                    }

                } )
            }
            return res.status( 200 ).send( response );
        } )
    }
    catch ( error ) {

    }

}

exports.verifica = async ( req, res ) => {
    try {
        const query = 'SELECT * FROM proprietario WHERE email = ?'

        const result = await mysql.execute( query, [ req.body.email ] );
        console.log( result.json )
        if ( result.length == 1 ) {
            const response = {
                Mensagem: 'Usuario já cadastrado'
            }

            return res.status( 200 ).send( response );

        }
        else {
            const response = {
                Mensagem: 'Usuario não cadastrado'
            }

            return res.status( 200 ).send( response );

        }

    }
    catch ( error ) {
        console.log( error )
        return res.status( 500 ).send( { erro: error } )
    }

}



