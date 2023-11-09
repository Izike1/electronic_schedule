const {Router} = require('express')
const router = Router()
const userController = require('../controllers/userController')

router.post('/createUser', userController.createUser())

router.get('/getUser', userController.getUser())
router.get('/getUsersByGroupName', userController.getUsersByGroupName())
router.get('/getUsersByFacultyName', userController.getUsersByFacultyName())

router.delete('/removeUser', userController.removeUser())

module.exports = router
