const { Router } = require('express')
const router = Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddlewareCreator = require('../middleware/roleMiddlewareCreator')

router.get('/getUser', authMiddleware(), userController.getUser)
router.get('/getUsersByGroupName', authMiddleware(), userController.getUsersByGroupName)
router.get('/getUsersByFacultyName', authMiddleware(), userController.getUsersByFacultyName)

router.delete('/removeUser', authMiddleware(), roleMiddlewareCreator(['admin']), userController.removeUser)

module.exports = router
