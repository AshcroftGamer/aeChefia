const express = require( 'express' );
const app = express();
const morgan = require( 'morgan' );
const cookieParser = require('cookie-parser');
const bodyparser = require( 'body-parser' );

global.__basedir = __dirname;

app.use( bodyparser.urlencoded( { extended: false } ) );
app.use( bodyparser.json() );
app.use( express.json() );
app.use( cookieParser() );
app.use( morgan( 'dev' ) );


app.use( express.static( __dirname + '/public' ) );
app.use( '/uploads', express.static( 'uploads' ) );
app.use( '/public', express.static( __dirname + 'public' ) );
app.use( '/css', express.static( __dirname + 'public/css' ) );
app.use( '/js', express.static( __dirname + 'public/js' ) );
app.use( '/img', express.static( __dirname + 'public/img' ) );

const rotaCadastro = require( './route/cadastro' );
const rotaHome = require( './route/home' )
const rotaMesa = require( './route/mesa' )
const rotaCardapio = require( './route/cardapio' )
const rotaProprietario = require( './route/proprietario' );
const rotaFuncionario = require( './route/funcionario' )
const rotaLogout = require( './route/logout' )
const rotaLogin = require( './route/login' )
const rotaEstabelecimento = require( './route/estabelecimento' );
const rotaUsuarios = require( './route/usuarios' )
const rotaItens = require( './route/itens_cardapio' );
const rotaBebidaTipo = require('./route/bebida_tipo');
const rotaBebidaMarca = require('./route/bebida_marca');
const rotaMedidas = require('./route/medida');


app.use('/medida', rotaMedidas);
app.use('/bebidamarca', rotaBebidaMarca);
app.use('/bebidatipo', rotaBebidaTipo);
app.use( '/item', rotaItens );
app.use( '/usuarios', rotaUsuarios );
app.use( '/estabelecimento', rotaEstabelecimento );
app.use( '/login', rotaLogin );
app.use( '/logout', rotaLogout );
app.use( '/cadastro', rotaCadastro );
app.use( '/home', rotaHome );
app.use( '/mesa', rotaMesa );
app.use( '/cardapio', rotaCardapio );
app.use( '/funcionario', rotaFuncionario );
app.use( '/proprietario', rotaProprietario );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} )

app.get( '/teste', ( req, res ) => {
    res.sendFile( __dirname + '/public/pages/links.html' );
} )

/*
//! TELA DE ERROR
app.use( '*', ( req, res ) => {
    res.sendFile (__dirname + '/public/pages/error.html' );
} )
*/

module.exports = app;