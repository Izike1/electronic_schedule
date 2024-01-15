const {Router} = require('express')
const router = Router()
const attendanceController = require('../controllers/attendanceController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddlewareCreator = require("../middleware/roleMiddlewareCreator");

router.post('/attendanceCreate', authMiddleware(), roleMiddlewareCreator(['admin', 'teacher', 'headman']), attendanceController.createAttendance)

router.get('/getAttendance', authMiddleware(), attendanceController.getAttendance)

module.exports = router