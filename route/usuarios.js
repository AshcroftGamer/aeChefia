
const route = require('express').Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

route.post('/login', (req, res, next) => {

    // console.log('entriu')
    console.log(req.body.email);

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM proprietario WHERE email = ?`
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {

                console.log('entriu 2')

                return res.status(401).send({ mensagem: 'Falha na autenticação 1' })
            }

            if (req.body.google) {

                let token = jwt.sign({
                    id_usuario: results[0].id,
                    Nome: results[0].nome,
                    email: results[0].email,
                    Cpf: results[0].cpf,
                    telefone: results[0].telefone

                }, process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });
                return res.status(200).send({
                    mensagem: 'Autenticado com sucesso',
                    usuario: results,
                    token: token
                });



            } else {
                bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                    if (err) {
                        console.log('entriu 3')
                        return res.status(401).send({ mensagem: 'Falha na autenticação 2' })
                    }
                    if (result) {
                        let token = jwt.sign({
                            id_usuario: results[0].id,
                            Nome: results[0].nome,
                            email: results[0].email,
                            Cpf: results[0].cpf,
                            telefone: results[0].telefone,
                            id_tipo_cargo: results[0].id_tipo_cargo

                        }, process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            });
                        return res.status(200).send({
                            mensagem: 'Autenticado com sucesso',
                            usuario: results,
                            token: token
                        });
                    }
                    return res.status(401).send({ mensagem: 'Falha na autenticação 3' })
                });

            }


        });
    });
})

//não utilizado essa rota ainda
// 
// route.post('/login_adm', (req, res, next) => {
    // mysql.getConnection((error, conn) => {
        // if (error) { return res.status(500).send({ error: error }) }
        // const query = `SELECT * FROM proprietario WHERE email = ?`
        // conn.query(query, [req.body.email], (error, results, fields) => {
            // conn.release();
            // if (error) { return res.status(500).send({ error: error }) }
            // if (results.length < 1) {
                // return res.status(401).send({ mensagem: 'Falha na autenticação' })
            // }
            // if (results[0].id_tipo_cargo != 2) {
                // return res.status(401).send({ mensagem: 'Ação não autorizada' })
            // }
            // bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                // if (error) { return res.status(401).send({ mensagem: 'Falha na autenticação' }) }
                // if (result) {
                    // let token = jwt.sign({
                        // id_usuario: results[0].id,
                        // Nome: results[0].nome,
                        // email: results[0].email,
                        // cpf: results[0].cpf,
                        // telefone: results[0].telefone,
                        // id_tipo_cargo: results[0].id_tipo_cargo
// 
                    // }, process.env.JWT_KEY,
                        // {
                            // expiresIn: "1h"
                        // });
                    // return res.status(200).send({
                        // mensagem: 'Autenticado com sucesso',
                        // token: token
                    // });
                // }
                // return res.status(401).send({ mensagem: 'Falha na autenticação' })
            // });
// 
        // });
    // });
// })



module.exports = route;



