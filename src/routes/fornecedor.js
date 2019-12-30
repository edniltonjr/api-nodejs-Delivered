const fornecedorController = require('../controller/fornecedor')
const router = require('express').Router()

router.delete('/:fornecedor', fornecedorController.DeleteFornecedor)
router.post('/', fornecedorController.InsertFornecedor)
router.get('/', fornecedorController.getFornecedores)
router.get('/fornecedor', fornecedorController.getFornecedor)
router.put('/', fornecedorController.updateFornecedor)

module.exports.fornecedorRouter = router;