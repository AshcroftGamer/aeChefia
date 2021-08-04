const route = require('express').Router();
const multer = require('multer');
const estControl = require('../controllers/estabcontrol');

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
    res.sendFile(__basedir + '/public/pages/estabelecimento.html');
})



route.post( '/cadastro/estabelecimento', upload.single('logo'), estControl.postEstabelecimento );



module.exports = route;