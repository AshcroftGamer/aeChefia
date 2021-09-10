const router = require('express').Router();

const controller = require('../controllers/funcionario-controller');

router.get('/', (req, res) => {
    res.sendFile(__basedir + '/public/pages/funcionario.html');
})


router.post('/', controller.postFuncionario);


module.exports = router;