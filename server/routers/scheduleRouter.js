const Router = require('express')
const router = new Router()
const scheduleController = require('../controllers/scheduleController')

router.get('/getSchedule', scheduleController.getSchedule)

module.exports = router
