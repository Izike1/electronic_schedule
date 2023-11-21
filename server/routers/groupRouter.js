const {Router} = require('express')
const router = Router()
const groupController = require('../controllers/groupController')

router.post('/changeGroup', groupController.changeGroup)

router.get('/getGroups', groupController.getGroups)

router.delete('/removeGroup', groupController.removeGroup)

module.exports = router
