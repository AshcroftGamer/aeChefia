const express = require( 'express' );
const app = express();
const morgan = require( 'morgan' );
const bodyparser = require( 'body-parser' );
global.__basedir = __dirname;
app.use( bodyparser.urlencoded( { extended: false } ) );
app.use( bodyparser.json() );


const rotaCadastro = require( './route/cadastro' );
const rotaUser = require( './route/usuario' );
const rotaHome = require( './route/home' )
const rotaMesa = require( './route/mesa' )
const rotaCardapio = require( './route/cardapio' )
const rotaProprietario = require( './route/proprietario' );
const rotaFuncionario = require( './route/funcionario' )


app.use( '/cadastro', rotaCadastro );
app.use( '/user', rotaUser );
app.use( '/home', rotaHome );
app.use( '/mesa', rotaMesa );
app.use( '/cardapio', rotaCardapio );
app.use( '/funcionario', rotaFuncionario );
app.use( '/proprietario', rotaProprietario );


app.use( morgan( 'dev' ) );
app.use( express.static( __dirname + '/public' ) );
app.use( '/uploads', express.static( 'uploads' ) );
app.use( '/public', express.static( __dirname + 'public' ) );
app.use( '/css', express.static( __dirname + 'public/css' ) );
app.use( '/js', express.static( __dirname + 'public/js' ) );
app.use( '/img', express.static( __dirname + 'public/img' ) );


app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} )

<<<<<<< HEAD
=======
//? TELA DE CADASTRO DO USUARIO
app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/public/pages/cadastro.html');
})

//TODO: TELA DE DASHBOARD OU HOME
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/pages/home.html');
})

//? CADASTRO DE ESTABELECIMENTO
app.get('/cadastro/estabelecimento', (req, res) => {
    res.sendFile(__dirname + '/public/pages/estabelecimento.html');
})

//* SPLASH SCREEN SUCESSO ESTABELECIMENTO
app.get('/cadastro/estabelecimento/sucesso', (req, res) => {
    res.sendFile(__dirname + '/public/pages/estabelecimento-sucesso.html');
})

//? CADASTRO DE FUNCIONARIO
app.get('/cadastro/funcionario', (req, res) => {
    res.sendFile(__dirname + '/public/pages/funcionario.html');
})

//* SPLASH SCREEN SUCESSO FUNCIONARIO 
app.get('/cadastro/funcionario/sucesso', (req, res) => {
    res.sendFile(__dirname + '/public/pages/estabelecimento-sucesso.html');
})

//? CADASTRO DO CARDAPIO
app.get('/cadastro/cardapio', (req, res) => {
    res.sendFile(__dirname + '/public/pages/cardapio.html');
})


//TODO: --- TELA DE HOME COMPLETA
app.get('/home/ok', (req, res) => {
    res.sendFile(__dirname + '/public/pages/home-cadastrado.html');
})

//? CADASTRO DE COMIDA
app.get('/cadastro/comida', (req, res) => {
    res.sendFile(__dirname + '/public/pages/comida.html');
})

//? CADASTRO DE BEBIDA
app.get('/cadastro/bebida', (req, res) => {
    res.sendFile(__dirname + '/public/pages/bebida.html');
})

//* LISTA DE MESAS
app.get('/mesa', (req, res) => {
    res.sendFile(__dirname + '/public/pages/mesas-disponiveis.html')
})

//* LISTA DE ITENS DO CARDAPIO
app.get('/cardapio', (req, res) => {
    res.sendFile(__dirname + '/public/pages/cardapio.html')
})

 //* REDEFINIR SENHA
app.get('/redefinir', (req, res) => {
    res.sendFile(__dirname + '/public/pages/redefinir-senha.html')
})

//* LISTA DE FUNCIONARIOS
app.get('/funcionarios', (req, res) => {
    res.sendFile(__dirname + '/public/pages/lista-funcionarios.html')
})
>>>>>>> bc2bb8e39242b0ea89fe28223701f0bd1ef3492c

/*
//! TELA DE ERROR
app.use( '*', ( req, res ) => {
    res.sendFile (__dirname + '/public/pages/error.html' );
} )
*/

module.exports = app;