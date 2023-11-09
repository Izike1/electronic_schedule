const {Router} = require('express')
const router = Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', authController.registration.bind(authController))
router.post('/login', authController.login.bind(authController))
router.post('/logout', authController.logout)
router.post('/refresh', authController.refresh.bind(authController))

module.exports = router
