const {Router} = require('express')
const router = Router()
const createController = require('../controllers/createController')

router.post('/createGroup', createController.createGroup)
router.post('/createUser', createController.createUser)


module.exports = router