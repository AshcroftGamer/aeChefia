
const mysql = require( '../mysql' );


exports.postCardapio = async ( req, res ) => {
    try {



        const query = 'INSERT INTO cardapio (id_cardapio,id_estabelecimento) VALUES (?, ?);'
        const result = await mysql.execute( query,
            [
                req.body.id_cardapio,
                req.body.id_estabelecimento
            ] );

        const response = {
            mensagem: 'Cardapio inserido com sucesso',
           
        }

        return res.status( 201 ).send( response );
    }
    catch ( error ) {
        return res.status( 500 ).send( { err: error } )
    }

}


exports.patchCardapio = async ( req, res ) => {
    try {
        const query = 'UPDATE cardapio SET id_cardapio = ? WHERE id_estabelecimento = ?;'
        const result = await mysql.execute( query,
            [
                req.body.id_cardapio,
                req.body.id_estabelecimento
            ] );
            
        const response = {
            mensagem: 'cardapio atualizado com sucesso',
            
        }

        return res.status( 201 ).send( response );
    }
    catch ( error ) {
        return res.status( 500 ).send( error )
    }

}

exports.deleteCardapio = async ( req, res ) => {

    try {
        const query = 'DELETE from cardapio WHERE id_estabelecimento = ?'
        const result = await mysql.execute( query, [ req.body.id_estabelecimento ] );

        const response = {
            mensagem: 'cardapio removido com sucesso',
            
        }

        return res.status( 201 ).send( response );
    }
    catch ( error ) {
        return res.status( 500 ).send( error )
    }

}


exports.getCardapio = async ( req, res ) => {
    try {
        await mysql.execute( 'SELECT * FROM cardapio', ( error, results ) => {
            if ( error ) {
                return res.status( 500 ).send( { Erro: error } )
            }
            const response = {
                quantidade: results.length,
                cardapios: results.map( prod => {
                    return {
                        id_cardapio: prod.id_cardapio,
                        id_estabelecimento: prod.id_estabelecimento
                    }

                } )
            }
            return res.status( 200 ).send( response );
        } )
    }
    catch ( error ) {

    }

}