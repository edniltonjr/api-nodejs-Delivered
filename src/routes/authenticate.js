
const authController = require('../controller/auth')
const router = require('express').Router()

router.post('/', authController.index)

module.exports.auth = router;