const mysql = require( '../mysql' );


exports.postEstabelecimento = async ( req, res ) => {
    try {



        const query = 'INSERT INTO estabelecimento (nome_estabelecimento, logo, cep, endereco, mesa, id_proprietario) VALUES (?, ?, ?, ?, ?, ?);'
        await mysql.execute( query,
            [
                req.body.nome_estabelecimento,
                req.body.logo,
                req.body.cep,
                req.body.endereco,
                req.body.mesa,
                req.body.id_proprietario
            ] );

        const response = {
            mensagem: 'Estabelecimento inserido com sucesso!',

        }

        return res.status( 201 ).send( response );
    }
    catch ( error ) {
        return res.status( 500 ).send( { err: error } )
    }

}