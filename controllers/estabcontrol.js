
const mysql = require( '../mysql' );
// const path = require('path');

exports.postEstab = async ( req, res ) => {
    try {



        const query = 'INSERT INTO estabelecimento (nome_estabelecimento, logo, cep, endereco, mesa, id_proprietario) VALUES (?, ?, ?, ?, ?, ?);'
        const result = await mysql.execute( query,
            [
                req.body.nome_estabelecimento,
                // req.file.path.replace("public", " "),
                req.body.logo,
                req.body.cep,
                req.body.endereco,
                req.body.mesa,
                req.body.id_proprietario
            ] );

        const response = {
            mensagem: 'Estabelecimento inserido com sucesso!',
            estabelecimentoCriado: {
                id_estabelecimento: result.insertId,
                nome: req.body.nome,
                // logo: req.file.path,
                logo: req.body.logo,
                cep: req.body.cep,
                endereco: req.body.endereco,
                mesa: req.body.mesa,
                proprietario: req.body.id_proprietario
                
            }
        }

        return res.status( 201 ).send( response );
        
    }
    catch ( error ) {
        console.log(error)
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
        await mysql.execute( 'SELECT * FROM estabelecimento', ( error, results ) => {
            if ( error ) {
                return res.status( 500 ).send( { Erro: error } )
            }
            const response = {
                quantidade: results.length,
                Estabelecimento: results.map( prod => {
                    return {
                        id_estabelecimento: prod.id_estabelecimento,
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
        } )
    }
    catch ( error ) {

    }

}

exports.verifica = async ( req, res ) => {
    try {
        const query = 'SELECT * FROM estabelecimento WHERE id_proprietario = ?'

        const result = await mysql.execute( query, [ req.body.id_proprietario ] );
        console.log( result )
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
        // console.log( error )
        return res.status( 500 ).send( { erro: "Nenhum estabelecimento encontrado!" } )
    }

}
