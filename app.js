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

/*
//! TELA DE ERROR
app.use( '*', ( req, res ) => {
    res.sendFile (__dirname + '/public/pages/error.html' );
} )
*/

module.exports = app;