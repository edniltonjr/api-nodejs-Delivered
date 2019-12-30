const adminController = require('../controller/admin')
const router = require('express').Router()

router.post('/', adminController.index)



module.exports.adminRouter = router;