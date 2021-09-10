
const mysql = require( '../mysql' );
const bcrypt = require( 'bcrypt' );


exports.postItens_cardapio = async ( req, res ) => {
    try {
        var query = `INSERT INTO itens_do_cardapio(id_cardapio, id_item_tipo, id_bebida_tipo, id_marcas, id_medidas, nome_comida, preco)
        SELECT `;
        var result = await mysql.execute( query, [ req.body.email ] );
        if ( result.length > 0 ) {
            return res.status( 409 ).send( { Mensagem: 'Usuario já cadastrado' } )
        }
        const hash = await bcrypt.hashSync( req.body.senha, 10 );

        query = 'INSERT INTO itens_do_cardapio (nome, email, cpf, telefone, senha) VALUES (?, ?, ?, ?, ?)';
        const results = await mysql.execute( query,
            [
                req.body.nome,
                req.body.email,
                req.body.cpf,
                req.body.telefone,
                hash
            ] )
        const response = {
            mensagem: 'itens_do_cardapio criado com sucesso',
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

// exports.postitens_do_cardapio = async ( req, res ) => {
//     try {



//         const query = 'INSERT INTO itens_do_cardapio (nome, email, cpf, telefone, senha) VALUES (?, ?, ?, ?, ?);'
//         const result = await mysql.execute( query,
//             [
//                 req.body.nome,
//                 req.body.email,
//                 req.body.cpf,
//                 req.body.telefone,
//                 req.body.senha
//             ] );

//         const response = {
//             mensagem: 'itens_do_cardapio criado com sucesso',
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

exports.patchItens_cardapio = async ( req, res ) => {
    try {
        const query = 'UPDATE itens_do_cardapio SET nome = ? WHERE email = ?;'
        await mysql.execute( query,
            [
                req.body.nome,
                req.body.email
            ] );
        const response = {
            mensagem: 'itens_do_cardapio atualizado com sucesso',
            usuarioAtualizado: {
                nome: req.body.nome
            }
        }

        return res.status( 201 ).send( response );
    }
    catch ( error ) {
        return res.status( 500 ).send( error )
    }

}

exports.deleteItens_cardapio = async ( req, res ) => {
    try {


        const query = 'DELETE from itens_do_cardapio WHERE id_itens_do_cardapio = ?'
        await mysql.execute( query, [ req.body.id_itens_do_cardapio ] );
        const response = {
            mensagem: 'itens_do_cardapio removido com sucesso'
        }

        return res.status( 200 ).send( response );
    }
    catch ( error ) {
        return res.status( 500 ).send( error )
    }

}


exports.getTodos = async ( req, res ) => {
    try {
        await mysql.execute( 'SELECT * FROM itens_do_cardapio', ( error, results ) => {
            if ( error ) {
                return res.status( 500 ).send( { Erro: error } )
            }
            const response = {
                quantidade: results.length,
                itens_do_cardapios: results.map( prod => {
                    return {
                        id_itens_do_cardapio: prod.id_itens_do_cardapio,
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
        const query = 'SELECT * FROM itens_do_cardapio WHERE email = ?'

        const result = await mysql.execute( query, [ req.body.email ] );
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

            return res.status( 404 ).send( response );

        }

    }
    catch ( error ) {
        console.log( error )
        return res.status( 500 ).send( { erro: error } )
    }

}



