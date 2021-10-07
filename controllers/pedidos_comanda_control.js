
const mysql = require('../mysql');


exports.postPedido = async (req, res) => {
    try {



        const query = 'INSERT INTO pedidos_comanda (id_comanda, quant, id_itens_do_cardapio, id_estabelecimento) VALUES (?, ?, ?, ?);'
        const result = await mysql.execute(query,
            [
                req.body.id_comanda,
                req.body.quant,
                req.body.id_itens_do_cardapio,
                req.body.id_estabelecimento
            ]);


        const response = {
            mensagem: 'Pedido inserido com sucesso',
            pedidos: {
                id_pedido: result.insertId,
                id_comanda: req.body.id_comanda,
                quant: req.body.quant,
                id_itens_do_cardapio: req.body.id_itens_do_cardapio,
                id_estabelecimento: req.body.id_estabelecimento,

            }

        }

        return res.status(201).send(response);
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ error: error })
    }

}


exports.getPedido = async (req, res) => {
    try {
        await mysql.execute('SELECT * FROM pedidos_comanda', (error, results) => {
            if (error) {
                return res.status(500).send({ Erro: error })
            }
            const response = {
                quantidade: results.length,
                cardapios: results.map(prod => {
                    return {
                        id_comanda: prod.id_comanda,
                        quant: prod.quant,
                        item_do_cardapio: prod.id_itens_do_cardapio,
                        funcionario: prod.id_funcionario
                    }

                })
            }
            return res.status(200).send(response);
        })
    }
    catch (error) {

    }

}

exports.getUmPedido = async (req, res) => {
    try {
        const query = `SELECT * FROM pedidos_comanda WHERE id_comanda = ?;`

        const result = await mysql.execute(query, [req.params.id_comanda]);

        const response = {
            pedidos: result.map(ped => {
                return {
                    id_comanda: ped.id_comanda,
                    id_itens_do_cardapio: ped.id_itens_do_cardapio,
                    quant: ped.quant,
                    id_estabelecimento: ped.id_estabelecimento
                }
            })

        }
        return res.status(200).send(response)

    } catch (error) {
        return res.status(500).send({ Erro: error })
    }

}
exports.getSum = async (req, res) => {
    try {
        await mysql.execute('SELECT SUM(id_pedido) AS NumeroPedidos FROM pedidos_comanda', (error, results) => {
            if (error) {
                return res.status(500).send({ Erro: error })
            }
            const response = {
                quantidade: results
            }

            return res.status(500).send(response);
        })
    } catch (error) {

    }
}