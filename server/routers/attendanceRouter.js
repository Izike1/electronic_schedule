const { Router } = require('express')
const router = Router()
const attendanceController = require('../controllers/attendanceController')

router.post('/attendanceCreate', attendanceController.createAttendance)

router.get('/getAttendance', attendanceController.getAttendance)

module.exports = router