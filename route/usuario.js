const route = require( 'express' ).Router();
const userControl = require('../controllers/usuariocontrol');

// RODOU COM FORM URL ENCODED
route.post( '/login', userControl.loginUsuario );

//RODOU COM FORM URL ENCODED
route.post('/redsenha', userControl.redSenha);


module.exports = route;