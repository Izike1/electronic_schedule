const { Router } = require('express')
const router = Router()

const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const groupRouter = require('./groupRouter')
const facultyRouter = require('./facultyRouter')
const scheduleRouter = require('./scheduleRouter')
const analyticsRouter = require('./analyticsRouter')
const attendanceRouter = require('./attendanceRouter')

// authMiddleware(), roleMiddlewareCreator(['admin'])

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/attendance', attendanceRouter)
router.use('/group', groupRouter)
router.use('/faculty', facultyRouter)
router.use('/schedule', scheduleRouter)
router.use('/analytics', analyticsRouter)

module.exports = router
