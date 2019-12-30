const estoqueController = require('../controller/estoque')
const router = require('express').Router()

router.post('/entrada', estoqueController.InsertEntrada)
router.post('/saida', estoqueController.InsertSaida)
router.get('/', estoqueController.getEstoques)
router.get('/estoque', estoqueController.getEstoque)


module.exports.estoqueRouter = router;