const route = require( 'express' ).Router();
const login = require('../middleware/login_jwt');


route.get('/', (req, res) => {
    
    res.sendFile(__basedir + '/public/pages/home.html');
})

route.get('/entrar', login, (req, res) => {
    return res.status(200).send({Eba: 'passou'})
})


module.exports = route;