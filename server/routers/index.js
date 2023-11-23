const { Router } = require('express')
const router = Router()
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const createRouter = require('./createRouter')
// const attendanceRouter = require('./attendanceRouter')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddlewareCreator = require('../middleware/roleMiddlewareCreator')


router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/create', authMiddleware(), roleMiddlewareCreator(['admin']), createRouter)
// router.use('/attendance', attendanceRouter)

module.exports = router
