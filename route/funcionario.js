const express = require('express');
const func = express.Router();
func.get('/', (req, res) => {
    res.send("Bem vindo a Rota funcionario")
    
})

module.exports = func;