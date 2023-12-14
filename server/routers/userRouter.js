const { Router } = require('express')
const router = Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddlewareCreator = require('../middleware/roleMiddlewareCreator')

router.post('/createUser', userController.createUser)

router.get('/getUser', authMiddleware(), userController.getUser)
router.get('/getUsersByGroupName', userController.getUsersByGroupName)
router.get('/getUsersByFacultyName', authMiddleware(), userController.getUsersByFacultyName)

router.delete('/removeUser', authMiddleware(), roleMiddlewareCreator(['admin']), userController.removeUser)

module.exports = router
