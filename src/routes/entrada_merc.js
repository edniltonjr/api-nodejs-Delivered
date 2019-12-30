const entradaController = require('../controller/entrada_merc')
const router = require('express').Router()


router.post('/', entradaController.InsertMercadoria)
router.get('/', entradaController.getMercadorias)
router.get('/mercadoria', entradaController.getMercadoria)

module.exports.entradaRouter = router;