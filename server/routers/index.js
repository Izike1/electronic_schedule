const {Router} = require('express')
const router = Router()
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const createRouter = require('./createRouter')
// const attendanceRouter = require('./attendanceRouter')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/create', createRouter)
// router.use('/attendance', attendanceRouter)

module.exports = router
