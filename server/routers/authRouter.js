const { Router } = require('express')
const router = Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddlewareCreator = require('../middleware/roleMiddlewareCreator')

router.post('/registration',authMiddleware(), roleMiddlewareCreator(['admin']), authController.registration.bind(authController))
router.post('/login', authController.login.bind(authController))
router.post('/logout', authMiddleware(), authController.logout)

router.get('/refresh', authController.refresh.bind(authController))
router.get('/getAuth', authMiddleware(), roleMiddlewareCreator(['admin']), authController.getAuths)
router.get('/getAuthByChunk', authMiddleware(), roleMiddlewareCreator(['admin']), authController.getAuthsByChunks)

module.exports = router
