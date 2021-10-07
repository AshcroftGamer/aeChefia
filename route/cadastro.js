const route = require( 'express' ).Router();


route.get('/',  (req, res) => {
    // res.send('ok')
    res.sendFile(__basedir + '/public/pages/cadastro.html');
})


module.exports = route;