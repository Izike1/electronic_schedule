const Router = require('express')
const router = new Router()
const attendanceController = require('../controllers/attendanceController')

router.get('/getSchedule', attendanceController.getSchedule)

module.exports = router
