
const mysql = require( '../mysql' );


exports.postEstabelecimento = async ( req, res ) => {

    try {
        const query = `INSERT INTO estabelecimento ( nome_estabelecimento, logo, cep, 
                       endereco, mesa, id_proprietario) values (?, ?, ?, ?, ?, ?);`;
        const result = await mysql.execute( query,
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
            estabelecimento: {
                id_estabelecimento: result[ 0 ].id_estabelecimento,
                nome_estabelecimento: req.body.nome_estabelecimento,
                cep: req.body.cep,
                endereco: req.body.endereco,
                mesa: req.body.mesa
            }
        }

        return res.status( 200 ).send( response )
    } catch ( err ) {
        return res.status( 500 ).send( { err: err } )
    }
}