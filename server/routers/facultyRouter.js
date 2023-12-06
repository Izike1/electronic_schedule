const { Router } = require('express')
const router = Router()
const facultyController = require('../controllers/facultyController')

router.get('/getFaculty', facultyController.getFaculties)

module.exports = router