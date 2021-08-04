const route = require( 'express' ).Router();
const multer = require( 'multer' );
const cadastroControl = require('../controllers/cadastrocontrol');


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
    // res.send('ok')
    res.sendFile(__basedir + '/public/pages/cadastro.html');
})



route.post( '/cardapio', cadastroControl.postCardapio )

route.post( '/funcionario',  cadastroControl.postFuncionario)




module.exports = route;