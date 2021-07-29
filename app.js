const express = require( 'express' );
const app = express();
const morgan = require( 'morgan' );
const bodyparser = require( 'body-parser' );

app.use( bodyparser.urlencoded( { extended: false } ) );
app.use( bodyparser.json() );


const rotaCadastro = require('./route/cadastro');
const rotaUser = require('./route/usuario');

app.use('/cadastro', rotaCadastro);
app.use('/user', rotaUser);

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
    res.sendFile(__dirname + '/public/pages/cadastro-estabelecimento.html');
})

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/pages/home-cadastrado');
})
app.use( '*', ( req, res ) => {
    res.sendFile (__dirname + '/public/pages/error.html' );
} )


module.exports = app;