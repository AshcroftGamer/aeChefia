const router = require('express').Router();

const controle = require('../controllers/propcontrol');


router.post('/', controle.postItens);

module.exports = router;