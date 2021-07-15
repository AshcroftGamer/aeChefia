const express = require( 'express' );
const app = express();
const morgan = require( 'morgan' );
const bodyparser = require( 'body-parser' );

app.use( bodyparser.urlencoded( { extended: false } ) );
app.use( bodyparser.json() );

const rotaCardapio = require( './route/cardapio' );
const rotaFunciorario = require( './route/funcionario' );
const rotaProprietario = require( './route/proprietario' );

app.use( '/cardapio', rotaCardapio );
app.use( '/funcionario', rotaFunciorario );
app.use( '/proprietario', rotaProprietario );

app.use( morgan( 'dev' ) );
app.use( express.static( 'public' ) );
app.use( '/uploads', express.static( 'uploads' ) );
app.use( '/css', express.static( __dirname + 'public/css' ) );
app.use( '/js', express.static( __dirname + 'public/js' ) );
app.use( '/img', express.static( __dirname + 'public/img' ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} )
app.get('/cad', (req, res) => {
    res.sendFile(__dirname + '/public/pages/cad-estabelecimento.html');
})
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/pages/home.html');
})
app.use( '*', ( req, res ) => {
    res.sendFile (__dirname + '/public/pages/error.html' );
} )


module.exports = app;
