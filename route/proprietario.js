const route = require('express').Router();
const prop = require('../controllers/propcontrol');
const multer = require( 'multer' );



const storage = multer.diskStorage( {
    destination: ( req, file, cb ) => {
        cb( null, 'uploads/' )
    },
    filename: ( req, file, cb ) => {
        cb( null, file.originalname )
    }
} )
const upload = multer( { storage } )


route.get('/', (req, res) => {
    res.sendFile(__basedir + '/public/pages/home.html');
});

//traz todos proprietarios
route.get('/todos', prop.getProp);

//verifica se o proprietario é cadastrado apesar que o post proprietario faz a verificação já
route.get('/verifica', prop.verifica);


route.post('/cadastro', prop.postProprietario);


route.patch('/atualizar', prop.patchProprietario);

route.delete('/remover', prop.deleteProprietario)


module.exports = route;