const express = require('express');
const cardapio = express.Router();

cardapio.get('/', (req, res) => {
    res.send("Bem vindo a rota cardapio")
    
})

module.exports = cardapio;