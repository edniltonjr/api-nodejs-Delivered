const produtoController = require('../controller/produto')
const router = require('express').Router()

router.delete('/:produto', produtoController.DeleteProduto)
router.post('/', produtoController.InsertProduto)
router.get('/', produtoController.getProdutos)
router.get('/produto', produtoController.getProduto)
router.put('/', produtoController.updateProduto)

module.exports.produtoRouter = router;

