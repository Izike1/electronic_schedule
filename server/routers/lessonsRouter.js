const { Router } = require('express')
const router = Router()
const lessonController = require('../controllers/lessonController')
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddlewareCreator = require("../middleware/roleMiddlewareCreator");

router.get('/getLessons', authMiddleware(), roleMiddlewareCreator(['admin']), lessonController.getLessons)

module.exports = router
