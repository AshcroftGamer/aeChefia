
const bcrypt = require( 'bcrypt' );
const bd = require( '../mysql' );
const bd2 = require( '../mysql' ).pool;


//Funcionou com Form URL Encoded
exports.postCardapio = async ( req, res ) => {
    try {
        const query = "INSERT INTO cardapio ( id_cardapio , id_estabelecimento) VALUES (?, ?)";
        await bd.execute( query,
            [
                req.body.id_cardapio,
                req.body.id_estabelecimento
            ] );
        const response = {
            mensagem: 'Cardapio adicionado com sucesso!'

        }
        return res.status( 200 ).send( response );

    } catch ( error ) {
        return res.status( 500 ).send( { error: error } )
    }

}
//Funcionou com Form URL Encoded
exports.postFuncionario = async ( req, res ) => {

    try {
        const query = "INSERT INTO funcionario (nome, email, login, senha, id_estabelecimento ) VALUES (?, ?, ?, ?, ?)";
        await bd.execute( query,
            [
                req.body.nome,
                req.body.email,
                req.body.login,
                req.body.senha,
                req.body.id_estabelecimento
            ] )
        const response = {
            mensagem: 'Conta criada com sucesso!'

        }
        return res.status( 200 ).send( response );
    } catch ( error ) {
        return res.status( 500 ).send( { err: error } )
    }


}