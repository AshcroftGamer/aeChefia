const route = require('express').Router();


route.get('/', (req, res) => {
    res.sendFile(__basedir + '/public/pages/funcionario.html');
})



module.exports = route;