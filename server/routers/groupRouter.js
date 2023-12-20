const { Router } = require('express')
const router = Router()
const groupController = require('../controllers/groupController')
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddlewareCreator = require("../middleware/roleMiddlewareCreator");

router.post('/createGroup', authMiddleware(), roleMiddlewareCreator(['admin']), groupController.createGroup)
router.post('/changeGroup', authMiddleware(), roleMiddlewareCreator(['admin']), groupController.changeGroup)

router.get('/getSerfGroups', authMiddleware(), groupController.getSelfGroup)
router.get('/getGroups', authMiddleware(), groupController.getGroups)
router.get('/getGroupsByFaculty', authMiddleware(), groupController.getGroupsByFaculty)

router.delete('/removeGroup', authMiddleware(), roleMiddlewareCreator(['admin']), groupController.removeGroup)

module.exports = router
