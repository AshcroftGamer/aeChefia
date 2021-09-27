const route = require('express').Router();

route.get('/', (req, res) => {
    res.sendFile(__basedir + '/public/pages/home-cadastrado.html')
})

module.exports = route;