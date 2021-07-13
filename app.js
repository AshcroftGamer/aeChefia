const express = require('express');
const app = express();
const morgan = require('morgan')


app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/public/pages/cadastro.html');
})

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/pages/home.html');
})

module.exports = app;
