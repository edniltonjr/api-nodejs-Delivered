const categoriaController = require('../controller/categoria')
const router = require('express').Router()

router.delete('/:categoria', categoriaController.DeleteCategoria)
router.post('/', categoriaController.InsertCategoria)
router.get('/', categoriaController.getCategorias)
router.get('/categoria', categoriaController.getCategoria)
router.put('/', categoriaController.updateCategoria)

module.exports.categoriaRouter = router;