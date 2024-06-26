const { Router } = require('express')
const router = Router()

const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const groupRouter = require('./groupRouter')
const facultyRouter = require('./facultyRouter')
const lessonsRouter = require('./lessonsRouter')
const scheduleRouter = require('./scheduleRouter')
const analyticsRouter = require('./analyticsRouter')
const attendanceRouter = require('./attendanceRouter')
const uploadHandler = require('./uploadHandlerRouter')
const registerGroups = require('./registerGroupRouter')
// authMiddleware(), roleMiddlewareCreator(['admin'])

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/group', groupRouter)
router.use('/lessons', lessonsRouter)
router.use('/upload', uploadHandler)
router.use('/faculty', facultyRouter)
router.use('/schedule', scheduleRouter)
router.use('/analytics', analyticsRouter)
router.use('/attendance', attendanceRouter)
router.use('/registerGroup', registerGroups)

module.exports = router
