const { Router } = require('express')
const router = Router()
const facultyController = require('../controllers/facultyController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('createFaculty', authMiddleware(), facultyController.createFaculty)
router.post('changeFaculty', authMiddleware(), facultyController.changeFaculty)

router.get('/getFaculty', authMiddleware(), facultyController.getFaculties)

module.exports = router