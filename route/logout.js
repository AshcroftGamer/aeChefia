const route = require('express').Router();


route.get('/', (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/')

})

module.exports = route;