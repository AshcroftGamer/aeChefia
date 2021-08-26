const route = require( 'express' ).Router();
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);


route.get( '/', ( req, res ) => {
    res.send( 'Rota login' )
} );


route.post( '/', ( req, res ) => {
    let token = req.body.token;
    // console.log( token )

    async function verify() {
        const ticket = await client.verifyIdToken( {
            idToken: token,
            audience: CLIENT_ID,
        } );
        const payload = ticket.getPayload();
        const userid = payload[ 'sub' ];

        // console.log( payload )
    }
    verify().then( () => {
        res.cookie( 'session-token', token );
        res.send( 'success' )
    } ).catch(err=>{
        res.redirect('/')
    } );
} );





module.exports = route;