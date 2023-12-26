const Router = require('express')
const router = new Router()
const scheduleController = require('../controllers/scheduleController')
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddlewareCreator = require('../middleware/roleMiddlewareCreator')

router.post('/setSchedule', authMiddleware(), roleMiddlewareCreator(['admin','teacher']), scheduleController.setSchedule)
router.post('/unsetSchedule', authMiddleware(), roleMiddlewareCreator(['admin', 'teacher']), scheduleController.unsetSchedule)

router.get('/getSchedule', authMiddleware(), scheduleController.getSchedule)

module.exports = router
