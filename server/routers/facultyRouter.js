const { Router } = require('express')
const router = Router()
const facultyController = require('../controllers/facultyController')
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddlewareCreator = require("../middleware/roleMiddlewareCreator");

router.post('/createFaculty', authMiddleware(), roleMiddlewareCreator(['admin']), facultyController.createFaculty)
router.post('/changeFaculty', authMiddleware(), roleMiddlewareCreator(['admin']), facultyController.changeFaculty)
router.delete('/deleteFaculty', authMiddleware(), roleMiddlewareCreator(['admin']), facultyController.deleteFaculty)
router.get('/getFaculty', authMiddleware(), facultyController.getFaculties)
router.get('/getFacultyInfo', authMiddleware(), facultyController.getFacultyInfo)
module.exports = router