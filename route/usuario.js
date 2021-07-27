const user = require( 'express' ).Router();
const userControl = require('../controllers/usuariocontrol');

// RODOU COM FORM URL ENCODED
user.post( '/login', userControl.loginUsuario );

//RODOU COM FORM URL ENCODED
user.post('/redsenha', userControl.redSenha);


module.exports = user;