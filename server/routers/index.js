const { Router } = require('express')
const router = Router()
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const createRouter = require('./createRouter')
const groupRouter = require('./groupRouter')
const facultyRouter = require('./facultyRouter')
const scheduleRouter = require('./scheduleRouter')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddlewareCreator = require('../middleware/roleMiddlewareCreator')


router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/create', authMiddleware(), roleMiddlewareCreator(['admin']), createRouter)
router.use('/group', groupRouter)
router.use('/faculty', facultyRouter)
router.use('/schedule', scheduleRouter)

module.exports = router
