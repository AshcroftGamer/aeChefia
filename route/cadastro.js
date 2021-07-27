const sign = require( 'express' ).Router();
const multer = require( 'multer' );
const path = require( 'path' );
const jwt = require( 'jsonwebtoken' );
const cadastroControl = require('../controllers/cadastrocontrol')


const storage = multer.diskStorage( {
    destination: ( req, file, cb ) => {
        cb( null, 'uploads/' )
    },
    filename: ( req, file, cb ) => {
        cb( null, file.originalname )
    }
} )
const upload = multer( { storage } )


// ----- ROTA DE TESTE DE UPLOAD DE IMAGENS -----tt
sign.post( '/imagem', upload.single( 'imagem2' ), ( req, res ) => {
    console.log( req.body )
    console.log( req.file )
    bd.getConnection( ( err, conn ) => {
        if ( err ) {
            return res.status( 500 ).send( { err: err } )
        }
        return res.send( 'ok' )
    } )
} )

sign.post( '/usuario', cadastroControl.postUsuario)

sign.post( '/estabelecimento', upload.single('logo'), cadastroControl.postEstabelecimento )

sign.post( '/cardapio', cadastroControl.postCardapio )

sign.post( '/funcionario',  cadastroControl.postFuncionario)




module.exports = sign;