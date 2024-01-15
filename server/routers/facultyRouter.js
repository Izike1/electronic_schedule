const { Router } = require('express')
const router = Router()
const facultyController = require('../controllers/facultyController')
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddlewareCreator = require("../middleware/roleMiddlewareCreator");

router.post('createFaculty', authMiddleware(), roleMiddlewareCreator(['admin']),facultyController.createFaculty)
router.post('changeFaculty', authMiddleware(), roleMiddlewareCreator(['admin']),facultyController.changeFaculty)

router.get('/getFaculty', authMiddleware(), facultyController.getFaculties)

module.exports = router