const { Router } = require('express')
const router = Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddlewareCreator = require('../middleware/roleMiddlewareCreator')

router.post('/registration', authMiddleware(), roleMiddlewareCreator(['admin']), authController.registration.bind(authController))
router.post('/login', authController.login.bind(authController))
router.post('/logout', authMiddleware(), authController.logout)
router.post('/refresh', authMiddleware(), authController.refresh.bind(authController))

module.exports = router
