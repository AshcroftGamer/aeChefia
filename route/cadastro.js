const route = require( 'express' ).Router();
const multer = require( 'multer' );
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
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

function checkAuthenticated(req, res, next){
    let token = req.cookies['session-token'];

    let user = {};

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
    }
    verify()
    .then(()=>{
        req.user = user;
        next();
    })
    .catch(err=>{
        res.redirect('/')
    })

}

route.get('/', checkAuthenticated, (req, res) => {
    // res.send('ok')
    res.sendFile(__basedir + '/public/pages/cadastro.html');
})



route.post( '/cardapio', cadastroControl.postCardapio )

route.post( '/funcionario',  cadastroControl.postFuncionario)




module.exports = route;