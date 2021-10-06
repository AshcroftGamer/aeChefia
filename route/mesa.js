const route = require('express').Router();


route.get('/', (req, res) => {
    res.sendFile(__basedir + '/public/pages/mesas-disponiveis.html');
})

module.exports = route;