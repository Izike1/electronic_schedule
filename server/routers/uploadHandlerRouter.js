const Router = require('express')
const router = new Router()
const uploadHandler = require('../utils/uploadHandler')
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddlewareCreator = require('../middleware/roleMiddlewareCreator')

router.post('/uploadFromExcel', authMiddleware(), roleMiddlewareCreator(['admin']), uploadHandler)

module.exports = router
