
const mysql = require( '../mysql' );


exports.postCardapio = async ( req, res ) => {
    try {

        const query = 'INSERT INTO cardapio (id_estabelecimento) VALUES (?);'
        const result = await mysql.execute( query, [req.params.id_estabelecimento] );

        const response = {
            mensagem: 'Cardapio inserido com sucesso',
            cardapioCriado: {
                id_cardapio: result.insertId,
                id_estabelecimento: req.params.id_estabelecimento
            }

        }

        return res.status( 201 ).send( response );
    }
    catch ( error ) {
        console.log(error)
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
        const query = 'DELETE from cardapio WHERE id_cardapio = ?'
        const result = await mysql.execute( query, [ req.params.id_cardapio ] );

        const response = {
            mensagem: 'cardapio removido com sucesso',

        }

        return res.status( 201 ).send( response );
    }
    catch ( error ) {
        console.log(error)
        return res.status( 500 ).send( { error: error } )
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

exports.verifica = async ( req, res ) => {
    try {
        const query = 'SELECT * FROM cardapio WHERE id_estabelecimento = ?;';
        const result = await mysql.execute( query, [ req.params.id_estabelecimento ] );
        if ( result.length > 0 ) {
            
            const response = {
                
                id_cardapio: result[ 0 ].id_cardapio,
                id_estabelecimento: result[ 0 ].id_estabelecimento
            }
    

            return res.status( 200 ).send( response );

        }
        else {
            const response = {
                quantidade: result.length,
                Mensagem: 'Cardapio não encontrado'
            }

            return res.status( 404 ).send( response );

        }

    }
    catch ( error ) {
        return res.status( 500 ).send( { erro: error } )
    }

}

exports.getQuantidade = async ( req, res ) => {
    try {
        const query = `SELECT * FROM cardapio
        INNER JOIN estabelecimento
        ON cardapio.id_estabelecimento = estabelecimento.id_estabelecimento
        WHERE estabelecimento.id_estabelecimento = ?;`
        
        const result = await mysql.execute( query, [req.params.id_estabelecimento ] );

        const response = {
            quantidade: result.length,
            cardapio: result.map( card => {
                return{
                    id_cardapio: card.id_cardapio,
                    id_estabelecimento: card.id_estabelecimento,
                    //nome_estabelecimento: card.nome_estabelecimento,
                    //logo: card.logo,
                    //cep: card.cep,
                    //endereco: card.endereco,
                    //mesa: card.mesa,
                    id_proprietario: card.id_proprietario
                }
            })

            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { Erro: error } )
    }
}

exports.getItem = async ( req, res ) => {
    try {
        const query = `SELECT * FROM itens_do_cardapio
        INNER JOIN cardapio
        ON itens_do_cardapio.id_cardapio = cardapio.id_cardapio
        WHERE itens_do_cardapio.id_cardapio = ?;`
        
        const result = await mysql.execute( query, [req.params.id_cardapio ] );

        const response = {
            quantidade: result.length,
            cardapio: result.map( card => {
                return{
                    id_cardapio: card.id_cardapio,
                    id_item_tipo: card.id_item_tipo,
                    id_medidas: card.id_medidas,
                    id_marcas: card.id_marcas,
                    nome_comida: card.nome_comida,
                    preco: card.preco
                    //cep: card.cep,
                    //endereco: card.endereco,
                    //mesa: card.mesa,
                    
                }
            })

            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { Erro: error } )
    }
}

exports.getTipo = async ( req, res ) => {
    try {
        const query = `SELECT * FROM item_tipo WHERE tipo = ?;`
        
        const result = await mysql.execute( query, [req.params.tipo ] );

        const response = {
            tipos: result.map( tip => {
                return{
                    id_item_tipo: tip.id_item_tipo,
                    tipo: tip.tipo
                }
            })

            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { Erro: error } )
    }

}