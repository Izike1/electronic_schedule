const Router = require('express')
const router = new Router()
const scheduleController = require('../controllers/scheduleController')
const authMiddleware = require("../middleware/authMiddleware");

router.get('/getSchedule', authMiddleware(), scheduleController.getSchedule)

module.exports = router
