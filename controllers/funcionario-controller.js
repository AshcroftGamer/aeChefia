const mysql = require('../mysql')

exports.postFuncionario = async(req, res) => {
    try {
        const query = 'INSERT INTO funcionario (nome, email, login, senha, ) VALUES (?,?,?,?)';
        const result = await mysql.execute(query, [req.body.name ]);
        const response = {
            mensagem: 'Funcionario inserido com sucesso',
            // resulstado: result,
            categoriaCriada: {
                id_categorias: result.insertId,
                name: req.body.name,
                request: {
                    tipo: 'POST'
                }
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
}

};