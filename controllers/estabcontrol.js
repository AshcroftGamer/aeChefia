
const mysql = require( '../mysql' );
// const path = require('path');

exports.postEstab = async ( req, res ) => {
    try {



        const query = 'INSERT INTO estabelecimento (nome_estabelecimento, logo, cep, endereco, mesa, id_proprietario) VALUES (?, ?, ?, ?, ?, ?);'
        const result = await mysql.execute( query,
            [
                req.body.nome_estabelecimento,
                req.file.path.replace("public", " "),
                req.body.cep,
                req.body.endereco,
                req.body.mesa,
                req.body.id_proprietario
            ] );

        const response = {
            mensagem: 'Estabelecimento inserido com sucesso!',
            estabelecimentoCriado: {
                id_estabelecimento: result.insertId,
                nome_estabelecimento: req.body.nome_estabelecimento,
                logo: req.file.path,
                cep: req.body.cep,
                endereco: req.body.endereco,
                mesa: req.body.mesa,
                id_proprietario: req.body.id_proprietario

            }
        }

        return res.status( 201 ).send( response );

    }
    catch ( error ) {
        return res.status( 500 ).send( { err: error } )
    }

}


exports.patchEstabelecimento = async ( req, res ) => {
    try {
        const query = 'UPDATE estabelecimento SET mesa = ? WHERE id_proprietario = ?;'
        await mysql.execute( query,
            [
                req.body.mesa,
                req.body.id_proprietario
            ] );

        const response = {
            mensagem: 'Estabelecimento atualizado com sucesso',

        }

        return res.status( 201 ).send( response );
    }
    catch ( error ) {
        return res.status( 500 ).send( error )
    }

}

exports.deleteEstabelecimento = async ( req, res ) => {

    try {
        const query = 'DELETE from estabelecimento WHERE id_estabelecimento = ?'
        await mysql.execute( query, [ req.body.id_estabelecimento ] );

        const response = {
            mensagem: 'Estabelecimento removido com sucesso',

        }

        return res.status( 200 ).send( response );
    }
    catch ( error ) {
        return res.status( 500 ).send( error )
    }

}


exports.getEstabelecimento = async ( req, res ) => {
    try {
        /*const queryProprietario = 'SELECT * FROM proprietario WHERE id_proprietario = ?';
        const resultProprietario = await mysql.execute(queryProprietario, [req.params.id_proprietario]);
        if(resultProprietario.length == 0){
            return res.status(404).send({ message: 'Proprietario não encontrado'})
        }*/
            const results = await mysql.execute( 'SELECT * FROM estabelecimento')
            const response = {
                quantidade: results.length,
                estabelecimento: results.map( estab => {
                    return {
                        id_estabelecimento: estab.id_estabelecimento,
                        nome_estabelecimento: estab.nome_estabelecimento,
                        logo: estab.logo,
                        cep: estab.cep,
                        endereco: estab.endereco,
                        mesa: estab.mesa,
                        id_proprietario: estab.id_proprietario
                    }

                } )
            }
            return res.status( 200 ).send( response );
        
    }
    catch ( error ) {
        return res.status( 500 ).send( { error: error } )
    }

}

exports.getEstabProp = async ( req, res ) => {
    try {
        const query = `SELECT * FROM estabelecimento
        INNER JOIN proprietario
        ON estabelecimento.id_proprietario = proprietario.id_proprietario
        WHERE proprietario.id_proprietario = ?;`
        
        const result = await mysql.execute( query, [req.params.id_proprietario ] );

        const response = {
            quantidade: result.length,
            estabelecimento: result.map( estab => {
                return{
                    id_estabelecimento: estab.id_estabelecimento,
                    nome_estabelecimento: estab.nome_estabelecimento,
                    logo: estab.logo,
                    cep: estab.cep,
                    endereco: estab.endereco,
                    mesa: estab.mesa,
                    id_proprietario: estab.id_proprietario
                }
            })

            }
        return res.status( 200 ).send( response )

    } catch ( error ) {
        return res.status( 500 ).send( { Erro: error } )
    }
}
exports.verifica = async ( req, res ) => {
    try {
        const query = 'SELECT * FROM estabelecimento WHERE id_proprietario = ?'

        const result = await mysql.execute( query, [ req.body.id_proprietario ] );
        const response = {
            quantidade: result.length,
            Estabelecimento: result.map( prod => {
                return {
                    id_estalecimento: prod.id_estabelecimento,
                    nome: prod.nome_estabelecimento,
                    logo: prod.logo,
                    cep: prod.cep,
                    endereco: prod.endereco,
                    mesa: prod.mesa,
                    id_proprietario: prod.id_proprietario
                }

            } )
        }

        return res.status( 200 ).send( response );

    }
    catch ( error ) {
        return res.status( 500 ).send( { erro: "Nenhum estabelecimento encontrado!" } )
    }

}
