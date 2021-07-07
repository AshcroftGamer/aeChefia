const express = require('express');
const prop = express.Router();



prop.get('/', (req, res) => {
    res.send("Bem vindo a rota proprietario")
    
})



prop.post('/', (req, res) => {
    res.send("Bem vindo a rota proprietario")
    
})



prop.patch('/', (req, res) => {
    res.send("Bem vindo a rota proprietario")
    
})



prop.delete('/', (req, res) => {
    res.send("Bem vindo a rota proprietario")
    
})


module.exports = prop;