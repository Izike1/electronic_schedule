const { Router } = require('express')
const router = Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddlewareCreator = require('../middleware/roleMiddlewareCreator')

router.post('/createUser', authMiddleware(), roleMiddlewareCreator(['admin']), userController.createUser)

router.get('/getUser', authMiddleware(), roleMiddlewareCreator(['admin']), userController.getUser)
router.get('/getUsersByGroupName', authMiddleware(), roleMiddlewareCreator(['admin']), userController.getUsersByGroupName)
router.get('/getUsersByFacultyName', authMiddleware(), roleMiddlewareCreator(['admin']), userController.getUsersByFacultyName)

router.delete('/removeUser', authMiddleware(), roleMiddlewareCreator(['admin']), userController.removeUser)
router.post('/changeUser', authMiddleware(), roleMiddlewareCreator(['admin']), userController.changeUser)
module.exports = router
