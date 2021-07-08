const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyparser = require('body-parser')
app.use(morgan('dev'))

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());



const rotaCardapio = require('./route/cardapio');
const rotaFunciorario = require('./route/funcionario');
const rotaProprietario = require('./route/proprietario');



app.use(express.static('public'));



app.use('/cardapio', rotaCardapio)
app.use('/funcionario', rotaFunciorario)
app.use('/proprietario', rotaProprietario)
app.use('/uploads', express.static('uploads'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// ? CORS - CROSS ORIGIN RESOUCE SHARING
// * Conjunto de regras nas quais determina o que pode ser acessado e o que pode ...
// * não pode ser, com limites de acesso, entre outros.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header(
        'Access-Control-Allow-Header',
        'Origin,X-Requested-With,Content-Type,Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).send({});
    }
    next();
});

// ! Tratamento criado para quando não for encontrado nenhuma rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);

    return res.send({
        erro: {
            message: error.message
        }
    });
});



app.use('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


module.exports = app;