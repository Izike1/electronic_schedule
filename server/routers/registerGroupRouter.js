const Router = require('express')
const router = new Router()
const createGroupsProfile = require('../utils/createGroupsProfile')
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddlewareCreator = require('../middleware/roleMiddlewareCreator')

router.post('/createGroupsProfile', authMiddleware(), roleMiddlewareCreator(['admin']), createGroupsProfile)

module.exports = router